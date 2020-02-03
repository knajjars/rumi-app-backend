import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, DeleteAccountPayload } from '../../common';
import { UserModel } from '../../models';
import { mailerClient } from '../util';

export const deleteAccount: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body as DeleteAccountPayload;

    const foundUser = await UserModel.findOne({ email });

    if (foundUser === null) {
      const err = new ApiError('Email does not match an account.', HttpStatusCodes.NotFound);
      return next(err);
    }

    await mailerClient.sendDeleteAccount(foundUser.email);

    res.status(HttpStatusCodes.Created).json({ message: 'Delete request is scheduled.' });
  } catch (err) {
    logger.error('Error requesting deletion.', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
