import { check, ValidationChain } from 'express-validator';
import { Types } from 'mongoose';

export const uploadImagePayloadValidation: ValidationChain[] = [
  check('apartmentId')
    .isString()
    .notEmpty()
    .custom((input: any) => Types.ObjectId.isValid(input))
    .withMessage('Invalid ApartmentId')
];
