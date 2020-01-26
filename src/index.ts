import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import ConnectMongo from 'connect-mongo';
import mongoose from 'mongoose';
import 'passport';

import passportConfig from './configs/passport';
import router from './routes';
import { port, sessionSecret } from './configs';
import { ApiError, HttpStatusCodes } from './common';

import './configs/db';

const MongoStore = ConnectMongo(session);

const app = express();

app.use(
  session({
    secret: sessionSecret!,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
  })
);

passportConfig(app);

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
