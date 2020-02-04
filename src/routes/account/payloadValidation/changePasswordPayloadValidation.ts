import { check, ValidationChain } from 'express-validator';
import shortid from 'shortid';

const passwordMinLength: number = 6;

export const changePasswordPayloadValidation: ValidationChain[] = [
  check('code')
    .isString()
    .custom((input: any) => shortid.isValid(input)),
  check('password')
    .isString()
    .isLength({ min: passwordMinLength })
    .withMessage(`Password must be ${passwordMinLength} characters long`)
];
