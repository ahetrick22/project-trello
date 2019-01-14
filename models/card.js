const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: String,
  list: { type: Schema.Types.ObjectId, ref: 'list' },
  label: String,
  description: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment'}],
  activity: [String]
})

const Card = mongoose.model('card', CardSchema);

module.exports = Card;

