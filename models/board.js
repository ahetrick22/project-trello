const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  name: String,
  lists: [{ type: Schema.Types.ObjectId, ref: 'list' }],
  organization: { type: Schema.Types.ObjectId, ref: 'organization' },
  frozen: Boolean
})

const Board = mongoose.model('board', BoardSchema);

module.exports = Board;


