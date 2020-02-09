import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError } from '../../common';
import { UserModel } from '../../models';

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const userId: Types.ObjectId = req.userId;

    await UserModel.findByIdAndUpdate(userId, { isActivated: true });

    res.status(HttpStatusCodes.Ok).json({ message: 'Email was verified' });
  } catch (err) {
    logger.error('Error verifying user email code', err);
    const error: ApiError = new ApiError('Error verifying user email code', HttpStatusCodes.ServerError);
    next(error);
  }
};
