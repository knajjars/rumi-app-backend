import { RequestHandler } from 'express';

export const searchApartments: RequestHandler = (req, res, _next) => {
  res.json(req.query);
};
