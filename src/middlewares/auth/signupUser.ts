import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import { logger } from '../../configs';
import { UserModel } from '../../models';
import { HttpStatusCodes, SignupPayload, User, ApiError } from '../../common';

const bcryptSalt = 10;

export const signupUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body as SignupPayload;

  try {
    await UserModel.findOne({ email }, 'email', async (_err, user) => {
      if (user !== null) {
        res.status(HttpStatusCodes.BadRequest).json({ message: 'The email is already registered!' });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      const createdUser: User = await UserModel.create({
        firstName,
        lastName,
        password: hashPass,
        email
      });

      res.status(HttpStatusCodes.Created).json(createdUser);
    });
  } catch (err) {
    logger.error(err);
    const error: ApiError = { message: 'Error creating user', status: HttpStatusCodes.ServerError };
    next(error);
  }
};
