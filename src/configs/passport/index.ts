import { Express } from 'express';
import { PassportStatic } from 'passport';
import mongoose from 'mongoose';
import ConnectMongo from 'connect-mongo';
import session from 'express-session';

import { sessionSecret } from '../variables';

import passportSerializers from './serializers';
import localStrategy from './localStrategy';

const MongoStore = ConnectMongo(session);

const passportConfig = (app: Express, passport: PassportStatic) => {
  passportSerializers(passport);
  localStrategy(passport);
  app.use(
    session({
      secret: sessionSecret!,
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportConfig;
