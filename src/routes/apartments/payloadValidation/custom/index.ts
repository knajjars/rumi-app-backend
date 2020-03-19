import { ApartmentAmenities, ApartmentServices } from '../../../../common';

export const validateAmenities = (amenities: ApartmentAmenities) => {
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
};

export const validateServices = (services: ApartmentServices) => {
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
};
