const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//define our model
const OrganizationSchema = new Schema({
  name: String,
  boards: [{ type: Schema.Types.ObjectId, ref: 'board' }],
  users: [{ type: Schema.Types.ObjectId, ref: 'user' }]
})

const Organization = mongoose.model('organization', OrganizationSchema);

module.exports = Organization;