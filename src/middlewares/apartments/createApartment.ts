import { RequestHandler } from 'express';

import {
  HttpStatusCodes,
  Apartment,
  User,
  ApiError,
  CreateApartmentRequestPayload,
  CreateApartmentResponsePayload
} from '../../common';
import { ApartmentModel } from '../../models';
import { logger } from '../../configs';

export const createApartment: RequestHandler = async (req, res, next) => {
  const apartmentPayload: CreateApartmentRequestPayload = req.body;

  const ownerId = (req.user as User)._id;

  try {
    const createdApartment: Apartment = await ApartmentModel.create({
      ...apartmentPayload,
      _owner: ownerId
    });

    const response: CreateApartmentResponsePayload = { apartmentId: createdApartment._id };
    res.status(HttpStatusCodes.Created).json(response);
  } catch (err) {
    logger.error(err);
    const error: ApiError = new ApiError('Error creating user', HttpStatusCodes.ServerError);
    next(error);
  }
};
