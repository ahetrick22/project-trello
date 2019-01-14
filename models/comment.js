const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'user'},
  text: String,
  card: { type: Schema.Types.ObjectId, ref: 'card'}
})

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
