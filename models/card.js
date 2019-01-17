const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: String,
  list: { type: Schema.Types.ObjectId, ref: 'list' },
  label: String,
  description: String,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment'}],
  activity: [{
    user : { type: Schema.Types.ObjectId, ref: 'user'},
    text : String,
    timestamp : Date
  }],
  archived: Boolean
})

const Card = mongoose.model('card', CardSchema);

module.exports = Card;

trk : [{
  lat : String,
  lng : String
   }]