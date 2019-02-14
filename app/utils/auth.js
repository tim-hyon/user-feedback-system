const passportJWT = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy(User.authenticate()));

  passport.use(new passportJWT.Strategy({
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  }, (payload, done) => {
    User.findById(payload.userId, (err, user) => {
      if (err) {
        return done(err);
      }

      return done(null, user);
    });
  }));
};
