import { Express } from 'express';
import passport from 'passport';

import './serializers';
import './localStrategy';

const passportConfig = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());
};

export default passportConfig;
