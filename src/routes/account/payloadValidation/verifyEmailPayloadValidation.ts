import { check, ValidationChain } from 'express-validator';
import shortid from 'shortid';

export const verifyEmailPayloadValidation: ValidationChain[] = [
  check('code')
    .isString()
    .custom((input: any) => shortid.isValid(input))
];
