import { RequestHandler } from 'express';

import { HttpStatusCodes, ApiError } from '../../common';

export const isAuthenticated: RequestHandler = (req, _res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  const err = new ApiError('Must be logged in', HttpStatusCodes.Forbidden);
  next(err);
};
