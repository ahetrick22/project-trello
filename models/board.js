const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const List = require('./list');

const BoardSchema = new Schema({
  lists: [{ type: List.ListSchema }],
  organization: { type: Organization.OrganizationSchema }
})

const BoardModel = mongoose.model('board', BoardSchema);

module.exports = {
  BoardModel,
  BoardSchema
}


