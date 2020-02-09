import { RequestHandler } from 'express';

import { Types } from 'mongoose';

import { UserModel } from '../../models';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, ChangeEmailRequestPayload, ChangeEmailResponsePayload } from '../../common';

export const changeEmail: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as ChangeEmailRequestPayload;

    const userId: Types.ObjectId = req.userId;

    await UserModel.findByIdAndUpdate(userId, { email });

    const response: ChangeEmailResponsePayload = { message: 'Email changed successfully' };
    res.status(HttpStatusCodes.Ok).json(response);
  } catch (err) {
    logger.error('Error changing user email', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
