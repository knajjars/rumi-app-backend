import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, UpdateUserRequestPayload, UpdateUserResponsePayload, User } from '../../common';
import { UserModel } from '../../models';

export const updateUser: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser: User = req.user as User;
    const payload = req.body as UpdateUserRequestPayload;

    if (Object.keys(payload).length === 0) {
      next(new ApiError('At least one field must be provided', HttpStatusCodes.BadRequest));
      return;
    }
    await UserModel.findByIdAndUpdate(loggedUser.id, { ...payload });

    const response: UpdateUserResponsePayload = payload;

    res.status(HttpStatusCodes.Ok).json(response);
  } catch (err) {
    logger.error('Error updating user', err);
    const error: ApiError = new ApiError('Error updating user', HttpStatusCodes.ServerError);
    next(error);
  }
};
