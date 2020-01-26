import { PassportStatic } from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';

import User from '../../models/User';

const localStrategy = (passport: PassportStatic) => {
  passport.use(
    new LocalStrategy.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const foundUser = await User.findOne({ email });

          if (foundUser === null) {
            return done(null, false, { message: 'Incorrect email' });
          }
          if (!bcrypt.compareSync(password, foundUser.password)) {
            return done(null, false, { message: 'Incorrect password' });
          }
          return done(null, foundUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};

export default localStrategy;
