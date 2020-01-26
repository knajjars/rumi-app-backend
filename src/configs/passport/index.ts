import { Express } from 'express';
import passport from 'passport';

import './serializers';
import './localStrategy';

export = (app: Express) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
