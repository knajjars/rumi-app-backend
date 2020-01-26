import { Express } from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import ConnectMongo from 'connect-mongo';
import session from 'express-session';

import { sessionSecret } from '../variables';

import './serializers';
import './localStrategy';

const MongoStore = ConnectMongo(session);

const passportConfig = (app: Express) => {
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
