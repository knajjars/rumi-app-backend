import { RequestHandler } from 'express';
import { Types } from 'mongoose';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, VerifyEmailRequestPayload } from '../../common';
import { UserModel, VerificationCodeModel } from '../../models';

export const verifyEmail: RequestHandler = async (req, res, next) => {
  try {
    const { code } = req.body as VerifyEmailRequestPayload;

    const verificationCode = await VerificationCodeModel.findByIdAndDelete(code);

    if (verificationCode === null) {
      logger.error('Verification code not found', { code });
      const err = new ApiError('Verification code not found', HttpStatusCodes.BadRequest);
      return next(err);
    }

    await UserModel.findByIdAndUpdate(verificationCode._user as Types.ObjectId, { isActivated: true });

    res.status(HttpStatusCodes.Ok).json({ message: 'Email was verified' });
  } catch (err) {
    logger.error('Error verifying user email code', err);
    const error: ApiError = new ApiError('Error verifying user email code', HttpStatusCodes.ServerError);
    next(error);
  }
};
