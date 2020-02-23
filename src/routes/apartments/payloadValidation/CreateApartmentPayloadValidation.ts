import { check, ValidationChain } from 'express-validator';

import {
  ApartmentCurrency,
  CurrencyUnit,
  ApartmentType,
  ApartmentLocation,
  ApartmentAmenities,
  ApartmentServices,
  getTodayDate
} from '../../../common';

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
    .isAfter(getTodayDate())
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
  check('amenities').custom((amenities: ApartmentAmenities) => {
    let valid: boolean = true;
    if (typeof amenities?.bed !== 'undefined' && typeof amenities?.bed !== 'number') {
      valid = false;
    }
    if (typeof amenities?.desk !== 'undefined' && typeof amenities?.desk !== 'boolean') {
      valid = false;
    }
    if (typeof amenities?.stove !== 'undefined' && typeof amenities?.stove !== 'boolean') {
      valid = false;
    }
    if (typeof amenities?.fridge !== 'undefined' && typeof amenities?.fridge !== 'boolean') {
      valid = false;
    }
    if (
      typeof amenities?.washingMachine !== 'undefined' &&
      typeof amenities?.washingMachine !== 'boolean'
    ) {
      valid = false;
    }
    return valid;
  }),
  check('services').custom((services: ApartmentServices) => {
    let valid: boolean = true;
    if (typeof services?.water !== 'undefined' && typeof services?.water !== 'boolean') {
      valid = false;
    }
    if (typeof services?.power !== 'undefined' && typeof services?.power !== 'boolean') {
      valid = false;
    }
    if (typeof services?.internet !== 'undefined' && typeof services?.internet !== 'boolean') {
      valid = false;
    }
    if (typeof services?.parking !== 'undefined' && typeof services?.parking !== 'boolean') {
      valid = false;
    }

    return valid;
  })
];
