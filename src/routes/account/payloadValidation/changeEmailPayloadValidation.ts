import { check, ValidationChain } from 'express-validator';
import shortid from 'shortid';

export const changeEmailPayloadValidation: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Must be valid email')
    .normalizeEmail(),
  check('code')
    .isString()
    .custom((input: any) => shortid.isValid(input))
];
