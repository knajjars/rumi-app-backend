import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, ResetPasswordPayload } from '../../common';
import { UserModel, VerificationCodeModel } from '../../models';
import { mailerClient } from '../util';

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as ResetPasswordPayload;

    const foundUser = await UserModel.findOne({ email });

    if (foundUser === null) {
      const err = new ApiError('No user found', HttpStatusCodes.BadRequest);
      return next(err);
    }

    const verificationCode = await VerificationCodeModel.create({ _user: foundUser.id });

    await mailerClient.sendResetPassword(foundUser.firstName, foundUser.email, verificationCode.id);

    res.status(HttpStatusCodes.Created).json({ message: 'Reset link sent' });
  } catch (err) {
    logger.error('Error changing user email', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
