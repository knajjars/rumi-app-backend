import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, User } from '../../common';

import { mailerClient } from '../util';

export const deleteAccount: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.user as User;

    await mailerClient.sendDeleteAccount(email);

    res.status(HttpStatusCodes.Created).json({ message: 'Delete request is scheduled.' });
  } catch (err) {
    logger.error('Error requesting deletion.', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
