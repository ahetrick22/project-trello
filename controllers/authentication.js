// const jwt = require('jwt-simple')
// const User = require('../models/user')
// const keys = require('../config/dev');

// function tokenForUser(user) {
//   return jwt.encode({ sub: user.id,
//     iat: Math.round(Date.now() / 1000),
//     exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
// }

// // User has already had their email and password auth'd
// //We want to give them a token
// exports.login = function(req, res, next) {

//   if (!email || !password) {
//      return res.status(422).send({ error: 'You must provide email and password'})
//   }

//   res.send({
//     token: tokenForUser(req.user),
//     email: req.user.email
//   })
// }

// exports.currentUser = function(req, res) {
//   res.send(req.user)
// }
