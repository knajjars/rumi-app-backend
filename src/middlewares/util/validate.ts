import { ValidationChain, validationResult, matchedData } from 'express-validator';
import { RequestHandler } from 'express';

import { HttpStatusCodes } from '../../common';

export const validate = (validations: ValidationChain[]): RequestHandler => {
  return async (req, res, next) => {
    for (const key in req.query) {
      try {
        req.query[key] = JSON.parse(req.query[key]);
      } catch {}
    }
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      req.body = matchedData(req, { locations: ['body'], includeOptionals: false });
      req.params = matchedData(req, { locations: ['params'], includeOptionals: false });
      req.query = matchedData(req, { locations: ['query'], includeOptionals: false });
      return next();
    }

    res.status(HttpStatusCodes.BadRequest).json({ errors: errors.array() });
  };
};
