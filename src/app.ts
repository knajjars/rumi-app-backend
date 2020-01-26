import express, { Request, Response, NextFunction } from 'express';
import passport from 'passport';

import router from './routes';
import { port, passportConfig, logger } from './configs';
import { ApiError, HttpStatusCodes } from './common';

import './configs/db';

const app = express();

app.use(express.json());

passportConfig(app, passport);

app.use('/api', router);
app.use('/*', (_req, _res, next) => {
  const error: ApiError = {
    message: 'Route not found',
    status: HttpStatusCodes.NotFound
  };
  next(error);
});

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(port, () => logger.info(`Aprta is live on port ${port}`));
