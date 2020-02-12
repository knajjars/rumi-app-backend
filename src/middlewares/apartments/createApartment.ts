import { RequestHandler } from 'express';

import { logger } from '../../configs';
import { ApartmentModel } from '../../models';
import { HttpStatusCodes, SignupRequestPayload, ApiError, Apartment } from '../../common';

export const signupUser: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, password, email } = req.body as SignupRequestPayload;

  try {
    await ApartmentModel.findOne({ email }, 'email', async (_err, user) => {
      if (user !== null) {
        res.status(HttpStatusCodes.BadRequest).json({ message: 'The email is already registered!' });
        return;
      }

      const createdUser: User = await UserModel.create({
        firstName,
        lastName,
        password: hashPassword(password),
        email
      });

      const verificationCode: VerificationCode = await VerificationCodeModel.create({ _user: createdUser.id });

      await mailerClient.sendAccountActivation(createdUser.firstName, createdUser.email, verificationCode.id);

      res.status(HttpStatusCodes.Created).json({ message: 'Signed up' });
    });
  } catch (err) {
    logger.error(err);
    const error: ApiError = new ApiError('Error creating user', HttpStatusCodes.ServerError);
    next(error);
  }
};
