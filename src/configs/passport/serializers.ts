import passport from 'passport';

import { User } from '../../common';

import { UserModel } from '../../models/';

passport.serializeUser((loggedInUser: User, done) => {
  done(null, loggedInUser._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await UserModel.findById(id);
    if (user === null) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});
