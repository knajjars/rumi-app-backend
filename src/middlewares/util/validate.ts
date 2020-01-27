import { ValidationChain, validationResult } from 'express-validator';
import { RequestHandler } from 'express';

import { HttpStatusCodes } from '../../common';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(HttpStatusCodes.BadRequest).json({ errors: errors.array() });
  };
};
