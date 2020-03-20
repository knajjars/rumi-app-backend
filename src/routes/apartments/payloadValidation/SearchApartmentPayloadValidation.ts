import { isNumber } from 'util';

import { check, ValidationChain } from 'express-validator';

import { ApartmentType, getTodayDate, Pagination } from '../../../common';

import { validateAmenities, validateServices } from './custom';

export const searchApartmentPayloadValidation: ValidationChain[] = [
  check('pagination')
    .exists()
    .custom(
      (input: Pagination) =>
        typeof input !== 'undefined' &&
        typeof input.limit === 'number' &&
        typeof input.offset === 'number'
    )
    .withMessage('Invalid pagination settings'),
  check('bedrooms')
    .optional()
    .isNumeric(),
  check('area')
    .optional()
    .isNumeric(),
  check('minPrice')
    .optional()
    .isNumeric(),
  check('maxPrice')
    .optional()
    .isNumeric(),
  check('tenantsAllowed')
    .optional()
    .isNumeric(),
  check('apartmentType')
    .optional()
    .isString()
    .custom((input: any) => Object.values(ApartmentType).includes(input))
    .withMessage('Invalid Apartment Type'),
  check('availableFrom')
    .optional()
    .isString()
    .isISO8601()
    .isAfter(getTodayDate())
    .withMessage('Must not be date in the past'),
  check('isFurnished')
    .optional()
    .isBoolean(),
  check('amenities')
    .optional()
    .custom(validateAmenities),
  check('services')
    .optional()
    .custom(validateServices),
  check('coordinates')
    .optional()
    .isArray()
    .custom((input: any[]) => {
      return input.length === 2 && isNumber(input[0]) && isNumber(input[1]);
    })
    .withMessage('Coordinates must be numbers')
];
