import { check, ValidationChain } from 'express-validator';

export const requestChangeEmailPayloadValidation: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Must be valid email')
    .normalizeEmail(),
  check('password').isString()
];
