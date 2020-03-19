import { check, ValidationChain } from 'express-validator';

import { ApartmentType, getTodayDate } from '../../../common';

import { validateAmenities, validateServices } from './custom';

export const searchApartmentPayloadValidation: ValidationChain[] = [
  check('bedrooms')
    .exists()
    .isNumeric(),
  check('area')
    .exists()
    .isNumeric(),
  check('minPrice')
    .exists()
    .isNumeric(),
  check('maxPrice')
    .exists()
    .isNumeric(),
  check('tenantsAllowed')
    .exists()
    .isNumeric(),
  check('apartmentType')
    .exists()
    .isString()
    .custom((input: any) => !Object.values(ApartmentType).includes(input))
    .withMessage('Invalid Apartment Type'),
  check('availableFrom')
    .exists()
    .isString()
    .isISO8601()
    .isAfter(getTodayDate())
    .withMessage('Must not be date in the past'),
  check('isFurnished')
    .exists()
    .isBoolean(),
  check('amenities')
    .exists()
    .custom(validateAmenities),
  check('services')
    .exists()
    .custom(validateServices)
];
