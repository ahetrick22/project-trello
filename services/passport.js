const passport = require('passport')
const User = require('../models/user')
const keys = require('../config/keys')
const ExtractJwt = require('passport-jwt').ExtractJwt

const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local')

// Create local strategy
const localOptions = { usernameField: 'email' }
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ email: email }, function(err, user) {
    if (err) { return done(err); }
    if (!user) { return done(null, false) }

    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' })
    }

    return done(null, user);
  })
})

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: keys.TOKEN_SECRET
} 