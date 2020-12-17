import { RequestHandler } from 'express';
import { PaginateOptions } from 'mongoose';

import { ApartmentModel } from '../../models';
import {
  SearchApartmentRequestQuery,
  Pagination,
  SearchApartmentResponsePayload,
  ApiError,
  HttpStatusCodes
} from '../../common';

export const searchApartments: RequestHandler = async (req, res, next) => {
  const query = (req.query as unknown) as SearchApartmentRequestQuery;

  const { limit, offset }: Pagination = query.pagination;

  const options: PaginateOptions = {
    sort: { 'price.value': 'asc' },
    offset,
    limit
  };

  const searchQuery = mapSearchQuery(query);

  try {
    const apartmentResults: SearchApartmentResponsePayload = await ApartmentModel.paginate(
      searchQuery,
      options
    );
    res.json(apartmentResults);
  } catch (err) {
    const error = new ApiError(err.message, HttpStatusCodes.ServerError);
    next(error);
  }
};

function mapSearchQuery(searchQuery: SearchApartmentRequestQuery): object {
  const query: any = {};

  const {
    amenities,
    apartmentType,
    area,
    availableFrom,
    bedrooms,
    coordinates,
    isFurnished,
    maxPrice,
    minPrice,
    services,
    tenantsAllowed
  } = searchQuery;

  if (typeof amenities !== 'undefined') {
    const { bed, desk, fridge, stove, washingMachine } = amenities;
    if (typeof bed !== 'undefined') {
      query['amenities.bed'] = { $gte: bed };
    }
    if (typeof desk !== 'undefined') {
      query['amenities.desk'] = desk;
    }
    if (typeof fridge !== 'undefined') {
      query['amenities.fridge'] = fridge;
    }
    if (typeof stove !== 'undefined') {
      query['amenities.stove'] = stove;
    }
    if (typeof washingMachine !== 'undefined') {
      query['amenities.washingMachine'] = washingMachine;
    }
  }

  if (typeof apartmentType !== 'undefined') {
    query['apartmentType'] = apartmentType;
  }

  if (typeof area !== 'undefined') {
    query['area'] = { $gte: area };
  }

  if (typeof availableFrom !== 'undefined') {
    query['availableFrom'] = { $gte: availableFrom };
  }

  if (typeof bedrooms !== 'undefined') {
    query['bedrooms'] = bedrooms;
  }

  if (typeof coordinates !== 'undefined') {
    // TODO - Query for coordinates
  }

  if (typeof isFurnished !== 'undefined') {
    query['isFurnished'] = isFurnished;
  }

  if (typeof maxPrice !== 'undefined') {
    query['price.value'] = { $lte: maxPrice };
  }

  if (typeof minPrice !== 'undefined') {
    query['price.value'] = { $gte: minPrice, ...query['price.value'] };
  }

  if (typeof services !== 'undefined') {
    const { internet, parking, power, water } = services;
    if (typeof internet !== 'undefined') {
      query['services.internet'] = internet;
    }
    if (typeof parking !== 'undefined') {
      query['services.parking'] = parking;
    }
    if (typeof power !== 'undefined') {
      query['services.power'] = power;
    }
    if (typeof water !== 'undefined') {
      query['services.water'] = water;
    }
  }

  if (typeof tenantsAllowed !== 'undefined') {
    query['tenantsAllowed'] = { $gte: tenantsAllowed };
  }

  return query;
}
