const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//define our model
const ListSchema = new Schema({
  name: String,
  board: { type: Schema.Types.ObjectId, ref: 'board' },
  cards: [{ type: Schema.Types.ObjectId, ref: 'card'}],
  archived: Boolean,
  frozen: Boolean
})

const List = mongoose.model('list', ListSchema);

module.exports = List;