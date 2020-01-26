import { RequestHandler } from 'express';
import passport from 'passport';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError } from '../../common';

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    await passport.authenticate('local', (err, user, failureDetails) => {
      if (err !== null) {
        res.status(HttpStatusCodes.ServerError).json({ message: 'An error ocurred.' });
        return;
      }

      if (user === null) {
        res.status(HttpStatusCodes.Unauthorized).json(failureDetails);
        return;
      }

      req.login(user, err => {
        if (err !== null) {
          res.status(HttpStatusCodes.ServerError).json({ message: 'An error ocurred.' });
          return;
        }
        res.status(HttpStatusCodes.OK).json(user);
      });
    });
  } catch (err) {
    logger.error(err);
    const error: ApiError = { message: 'Error logging user', status: HttpStatusCodes.ServerError };
    next(error);
  }
};
