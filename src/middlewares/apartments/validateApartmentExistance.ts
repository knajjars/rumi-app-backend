import { RequestHandler } from 'express';

import { ApartmentModel } from '../../models';
import { ApiError, HttpStatusCodes, Apartment } from '../../common';

export const validateApartmentExistance: RequestHandler = async (req, _res, next) => {
  const apartmentId = req.params.apartmentId;

  if (typeof apartmentId === 'undefined') {
    const error: ApiError = new ApiError(
      'Apartment ID was not provided in params',
      HttpStatusCodes.BadRequest
    );
    return next(error);
  }

  const apartment: Apartment | null = await ApartmentModel.findById(apartmentId);

  if (apartment === null) {
    const error: ApiError = new ApiError(
      'Apartment ID does not exist on database',
      HttpStatusCodes.BadRequest
    );
    return next(error);
  }
  next();
};
