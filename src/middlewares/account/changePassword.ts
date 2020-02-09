import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, ChangePasswordPayload } from '../../common';
import { UserModel } from '../../models';
import { hashPassword } from '../util';

export const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body as ChangePasswordPayload;

    const userId: Types.ObjectId = req.userId;

    await UserModel.findByIdAndUpdate(userId, { password: hashPassword(password) });

    res.status(HttpStatusCodes.Ok).json({ message: 'Password was changed' });
  } catch (err) {
    logger.error('Error changing user email', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
