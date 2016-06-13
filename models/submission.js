var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var submSchema = new Schema({
  problem_id: { type: String, default: '', ref: 'Problem' },
  contest_id: { type: String, default: '' },
  source_code: { type: Array, default: [] },
  status: {type: String, default: 'pending', index: true},
  user_id: { type: String, default: '' }
}, {timestamps : true});

submSchema.statics.findByIdWithTestCases = function (id, cb) {
  this
    .findById(id)
    .populate('problem_id')
    .lean()
    .exec(cb)
}

submSchema.statics.findWithTestCases = function (query, cb) {
  this
    .find(query)
    .populate('problem_id')
    .lean()
    .exec(cb)
}

var Submission = mongoose.model('Submission', submSchema);
module.exports = Submission;
