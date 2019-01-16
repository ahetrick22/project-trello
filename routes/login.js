
const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const router = require('express').Router();

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });


router.post('/login', requireLogin, Authentication.login)
router.post('/register', Authentication.signup)

module.exports = router;

