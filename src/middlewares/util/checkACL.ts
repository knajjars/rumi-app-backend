import { RequestHandler } from 'express';

import { HttpStatusCodes, UserRole, User, ApiError } from '../../common';

export const checkACL = (allowedUserRoles: UserRole[]): RequestHandler => {
  return (req, res, next) => {
    const user: User | undefined = req.user as any;

    if (typeof user === 'undefined') {
      const error: ApiError = new ApiError('User was not found', HttpStatusCodes.Unauthorized);
      next(error);
      return;
    }

    if (!allowedUserRoles.includes(user.role)) {
      res.status(HttpStatusCodes.Forbidden).json({ message: 'Not allowed' });
      return;
    }
    next();
  };
};
