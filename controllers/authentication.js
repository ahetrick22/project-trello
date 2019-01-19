
const jwt = require('jwt-simple')
const User = require('../models/user')
const keys = require('../config/keys');
const Organization = require('../models/organization');

function tokenForUser(user) {
   return jwt.encode({ sub: user.id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
}


// User has already had their email and password auth'd
//We want to give them a token
exports.login = function(req, res, next) {
   const { email, password } = req.body;

   if (!email || !password) {
      return res.status(422).send({ error: 'You must provide email and password'})
   }

   res.json({
     token: tokenForUser(req.user),
     email: req.user.email
   })
 }


exports.currentUser = function(req, res) {
  res.send(req.user)
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide email and password'})
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err) }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' })
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User()

    user.email = email
    user.boards = []
    user.organizations = []
    user.setPassword(password)

    //need to change this later!!
    Organization.find({}, (err, org) => {
      if (err) throw err;
      console.log(org);
      user.organizations.push(...org);
      user.save(function(err, user) {
        if (err) { return next(err) }
        console.log(user.email);
        // Repond to request indicating the user was created
        res.send(JSON.stringify({ token: tokenForUser(user), email: user.email }))
      });
    })
  });
}
