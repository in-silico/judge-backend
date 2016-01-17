var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submSchema = new Schema({
  problem_id: { type: String, default: '' },
  source_code: { type: Array, default: [] },
  status: {type: String, default: 'pending', index: true},
  user_id: { type: String, default: '' }
}, {timestamps : true});

var Submission = mongoose.model('Submission', submSchema);
module.exports = Submission;
