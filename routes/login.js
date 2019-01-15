const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const router = require('express').Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

module.exports = router => {
  router.post('/login', requireLogin, Authentication.login)
}