import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { HttpStatusCodes, ApiError, ChangeEmailRequestPayload, User, ChangeEmailResponsePayload } from '../../common';
import { UserModel } from '../../models';
import { comparePassword } from '../util';

export const changeEmail: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser: User = req.user as User;
    const { email, password } = req.body as ChangeEmailRequestPayload;

    if (!comparePassword(password, loggedUser.password)) {
      const err = new ApiError('Provided password does not match', HttpStatusCodes.Unauthorized);
      next(err);
      return;
    }

    if (loggedUser.email === email) {
      const err = new ApiError('A different email must be provided', HttpStatusCodes.BadRequest);
      next(err);
      return;
    }

    const userWithEmail: User | null = await UserModel.findOne({ email });

    if (userWithEmail !== null) {
      const err = new ApiError('E-mail already in use', HttpStatusCodes.UnprocessableEntity);
      next(err);
      return;
    }

    // FIXME  deactivate account and send email to new provided email
    await UserModel.findByIdAndUpdate(loggedUser.id, { email });

    const response: ChangeEmailResponsePayload = { email };

    res.status(HttpStatusCodes.Ok).json(response);
  } catch (err) {
    logger.error('Error changing user email', err);
    const error: ApiError = new ApiError('Error changing user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
