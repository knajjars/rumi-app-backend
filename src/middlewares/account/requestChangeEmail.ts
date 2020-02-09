import { RequestHandler } from 'express';

import { logger } from '../../configs';
import {
  HttpStatusCodes,
  ApiError,
  RequestChangeEmailRequestPayload,
  User,
  RequestChangeEmailResponsePayload,
  VerificationCode
} from '../../common';
import { UserModel, VerificationCodeModel } from '../../models';
import { comparePassword, mailerClient } from '../util';

export const requestChangeEmail: RequestHandler = async (req, res, next) => {
  try {
    const loggedUser: User = req.user as User;
    const { email, password } = req.body as RequestChangeEmailRequestPayload;

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

    const verificationCode: VerificationCode = await VerificationCodeModel.create({ _user: loggedUser.id });

    await mailerClient.sendChangeEmail(loggedUser.firstName, email, verificationCode._id);

    const response: RequestChangeEmailResponsePayload = { message: `Verification email sent to ${email}` };

    res.status(HttpStatusCodes.Ok).json(response);
  } catch (err) {
    logger.error('Error requesting change of user email', err);
    const error: ApiError = new ApiError('Error requesting change of user email', HttpStatusCodes.ServerError);
    next(error);
  }
};
