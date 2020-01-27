import { RequestHandler } from 'express';

export const searchApartments: RequestHandler = (_req, res, _next) => {
  res.json({ results: '!' });
};
