import { check, ValidationChain } from 'express-validator';

export const changeEmailPayloadValidation: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Must be valid email')
    .normalizeEmail(),
  check('password').isString()
];
