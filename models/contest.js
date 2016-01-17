var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Contest-problem schema
var cpSchema = new Schema({
  memory_limit: {type: Number, default: 256},
  problem_id: { type: String, default: '' },
  time_limit: { type: Number, default: 2}
});

var contestSchema = new Schema({
  description: { type: String, default: '' },
  problems: [cpSchema],
  title: { type: String, default: '' }
}, {timestamps : true});

contestSchema.methods.addProblem = function(problem, cb) {
  this.problems.push(problem);
  this.save(cb);
}

var Contest = mongoose.model('Contest', contestSchema);
module.exports = Contest;
