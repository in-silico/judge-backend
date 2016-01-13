var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submSchema = new Schema({
  user_id: { type: String, default: '' },
  status: {type: String, default: 'pending', index: true}
}, {timestamps : true});

var Submission = mongoose.model('Submission', submSchema);
module.exports = Submission;
