import { check, ValidationChain } from 'express-validator';

const passwordMinLength: number = 6;

export const loginPayloadValidation: ValidationChain[] = [
  check('email')
    .isEmail()
    .withMessage('Must be valid email')
    .normalizeEmail(),
  check('password')
    .isString()
    .isLength({ min: passwordMinLength })
    .withMessage(`Password must be ${passwordMinLength} characters long`)
];
