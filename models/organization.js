const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user')
const Board = require('./board')

//define our model
const OrganizationModel = new Schema({
  name: String,
  boards: [{ type: Board.BoardSchema }],
  users: [{ type: User.UserSchema }]
})

const OrganizationModel = mongoose.model('organization', OrganizationSchema);

module.exports = {
  OrganizationModel,
  OrganizationSchema
}