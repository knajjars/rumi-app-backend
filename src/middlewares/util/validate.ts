import { ValidationChain, validationResult, matchedData } from 'express-validator';
import { RequestHandler } from 'express';

import { HttpStatusCodes } from '../../common';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body = matchedData(req, { locations: ['body'], includeOptionals: true });
      req.params = matchedData(req, { locations: ['params'], includeOptionals: true });
      req.query = matchedData(req, { locations: ['query'], includeOptionals: true });
      return next();
    }

    res.status(HttpStatusCodes.BadRequest).json({ errors: errors.array() });
  };
};
