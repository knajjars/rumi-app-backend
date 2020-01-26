import express, { Request, Response, NextFunction } from 'express';

import router from './routes';
import { port } from './configs';
import { ApiError } from './common';
import { HttpStatusCodes } from './common/dictionary';

import './configs/db';

const app = express();

app.use('/api', router);
app.use('/*', (_req, _res, next) => {
  const error: ApiError = {
    message: 'Route not found',
    status: HttpStatusCodes.NotFound
  };
  next(error);
});

app.use((err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({ message: err.message });
});

app.listen(port, () => console.log(`Aprta is live on port ${port}!`));
