const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Organization = require('./organization')
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

// Define our model
const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  hash: String,
  salt: String,
  organizations: [{ type: Organization.OrganizationSchema }]
});

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');

  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

  return this.hash === hash;
};

// UserSchema.methods.generateJWT = function() {
//   var today = new Date();
//   var exp = new Date(today);
//   exp.setDate(today.getDate() + 60);
//
//   return jwt.sign({
//     _id: this._id,
//     exp: parseInt(exp.getTime() / 1000),
//   }, 'myLittleSecret');
// };

// Create the model class
const ModelClass = mongoose.model('user', UserSchema);

// Export the model
module.exports = ModelClass;