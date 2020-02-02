import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import { logger } from '../../configs';
import { UserModel, VerificationCodeModel } from '../../models';
import { HttpStatusCodes, SignupRequestPayload, ApiError, User, VerificationCode } from '../../common';

const bcryptSalt = 10;

export const signupUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body as SignupRequestPayload;

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

      const verificationCode: VerificationCode = await VerificationCodeModel.create({ _user: createdUser.id });
      // FIXME Do not send verification code in payload, but in an email
      res.status(HttpStatusCodes.Created).json({ message: 'Signed up', verificationCode });
    });
  } catch (err) {
    logger.error(err);
    const error: ApiError = new ApiError('Error creating user', HttpStatusCodes.ServerError);
    next(error);
  }
};
