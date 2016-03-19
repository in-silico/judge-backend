var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Contest-problem schema
var cpSchema = new Schema({
  memory_limit: {type: Number, default: 256},
  problem_id: { type: String, default: '', ref: 'Problem'},
  time_limit: { type: Number, default: 2}
});

var contestSchema = new Schema({
  description: { type: String, default: '' },
  problems: [cpSchema],
  title: { type: String, default: '' }
}, {timestamps : true});

contestSchema.methods.addProblems = function(toAdd, cb) {
  for (var i = 0; i < toAdd.length; ++i) {
    var problem = toAdd[i];
    this.problems.push(problem);
  }

  this.save(cb);
};

contestSchema.statics.findWithProblems = function (id, cb) {
  this
    .findById(id)
    .populate('problems.problem_id')
    .exec(cb)
};

var Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
