import { RequestHandler } from 'express';

import { ApartmentModel } from '../../models';
import { Apartment } from '../../common';

export const searchApartments: RequestHandler = async (_req, res, _next) => {
  const apartmentResults: Apartment[] = await ApartmentModel.find({});

  res.json(apartmentResults);
};
