import { check, ValidationChain } from 'express-validator';

export const updateUserPayloadValidation: ValidationChain[] = [
  check('firstName')
    .optional()
    .isString()
    .withMessage('Must be string')
    .isAlpha(),
  check('lastName')
    .optional()
    .isString()
    .withMessage('Must be string')
    .isAlpha(),
  check('phone')
    .optional()
    .matches(/^[0-9]*$/)
    .withMessage('Only numbers allowed')
    .isString()
    .withMessage('Must be string')
    .isLength({ min: 8 })
];
