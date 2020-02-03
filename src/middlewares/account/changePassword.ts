import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, ChangePasswordPayload } from '../../common';
import { UserModel, VerificationCodeModel } from '../../models';
import { hashPassword } from '../util';

export const changePassword: RequestHandler = async (req, res, next) => {
  try {
    const { password, code } = req.body as ChangePasswordPayload;

    const verificationCode = await VerificationCodeModel.findByIdAndDelete(code);

    if (verificationCode === null) {
      logger.error('Verification code not found', { code });
      const err = new ApiError('Verification code not found', HttpStatusCodes.BadRequest);
      return next(err);
    }

    await UserModel.findByIdAndUpdate(verificationCode._user, { password: hashPassword(password) });

    res.status(HttpStatusCodes.Ok).json({ message: 'Password was changed' });
  } catch (err) {
    logger.error('Error changing user email', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
