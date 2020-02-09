import { Types } from 'mongoose';

import { RequestHandler } from 'express';

import { HttpStatusCodes, ApiError } from '../../common';
import { VerificationCodeModel } from '../../models';
import { logger } from '../../configs';

const err = new ApiError('Verification code not found', HttpStatusCodes.BadRequest);

export const getUserIdFromVerificationCode: RequestHandler = async (req, _res, next) => {
  const { code } = req.body;

  if (typeof code === 'undefined') {
    logger.error('Verification code was not sent');
    next(err);
    return;
  }

  const verificationCode = await VerificationCodeModel.findByIdAndDelete(code);

  if (verificationCode === null) {
    logger.error('Verification code not found', { code });

    next(err);
    return;
  }

  req.userId = verificationCode._user as Types.ObjectId;
  next();
};
