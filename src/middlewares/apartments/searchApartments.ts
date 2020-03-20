import { RequestHandler } from 'express';
import { PaginateOptions } from 'mongoose';

import { ApartmentModel } from '../../models';
import {
  SearchApartmentRequestQuery,
  Pagination,
  SearchApartmentResponsePayload
} from '../../common';

export const searchApartments: RequestHandler = async (req, res, _next) => {
  const query = req.query as SearchApartmentRequestQuery;

  const { limit, offset }: Pagination = query.pagination;

  const options: PaginateOptions = {
    offset,
    limit
  };

  const apartmentResults: SearchApartmentResponsePayload = await ApartmentModel.paginate(
    {},
    options
  );

  res.json(apartmentResults);
};
