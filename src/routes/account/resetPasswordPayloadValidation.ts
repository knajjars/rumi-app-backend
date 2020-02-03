import { check, ValidationChain } from 'express-validator';

export const resetPasswordPayloadValidation: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Must be valid email')
    .normalizeEmail()
];
