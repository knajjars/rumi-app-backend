import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import router from './routes';
import { port, passportConfig, logger } from './configs';
import { ApiError, HttpStatusCodes } from './common';

import './configs/db';

const app = express();

app.use(helmet());
app.use(express.json());

passportConfig(app);

app.use('/api', router);
app.use('/*', (_req, _res, next) => {
  const error: ApiError = new ApiError('Route not found', HttpStatusCodes.NotFound);
  next(error);
});

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);
  res.status(err.status || HttpStatusCodes.ServerError).json({ message: err.message });
});

app.listen(port, () => logger.info(`Aprta is live on port ${port}`));
