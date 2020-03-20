import { check, ValidationChain } from 'express-validator';

import {
  ApartmentCurrency,
  CurrencyUnit,
  ApartmentType,
  ApartmentLocation,
  getMaxDate
} from '../../../common';

import { validateServices, validateAmenities } from './custom';

const validateApartmentCurrency = (currency: ApartmentCurrency) =>
  Object.values(CurrencyUnit).includes(currency.unit) && typeof currency.value === 'number';

export const createApartmentPayloadValidation: ValidationChain[] = [
  check('title')
    .exists()
    .isString()
    .notEmpty(),
  check('bedrooms')
    .exists()
    .isNumeric(),
  check('area')
    .exists()
    .isNumeric(),
  check('price')
    .exists()
    .custom(validateApartmentCurrency)
    .withMessage('Invalid currency format for apartment price'),
  check('deposit')
    .exists()
    .custom(validateApartmentCurrency)
    .withMessage('Invalid currency format for apartment deposit'),
  check('activateRadius')
    .exists()
    .isBoolean(),
  check('apartmentType')
    .exists()
    .isString()
    .notEmpty()
    .isIn(Object.values(ApartmentType)),
  check('availableFrom')
    .exists()
    .isString()
    .isISO8601()
    .isAfter(getMaxDate())
    .withMessage('Must not be date in the past'),
  check('isAvailable')
    .exists()
    .isBoolean(),
  check('isFurnished')
    .exists()
    .isBoolean(),
  check('location')
    .exists()
    .custom(
      (location: ApartmentLocation) =>
        Array.isArray(location.coordinates) && location.coordinates.length === 2
    )
    .withMessage('Invalid format for apartment location'),
  check('tenantsAllowed').isNumeric(),
  check('description')
    .isString()
    .notEmpty(),
  check('amenities').custom(validateAmenities),
  check('services').custom(validateServices)
];
