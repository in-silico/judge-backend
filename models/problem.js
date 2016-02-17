var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testCaseSchema = new Schema({
  input: { type: String, default: '' },
  output: { type: String, default: 2}
});

var problemSchema = new Schema({
  author: { type: String, default: '' },
  description: { type: String, default: '' },
  testcases: [testCaseSchema],
  title: { type: String, default: '' }
}, {timestamps : true});

problemSchema.methods.addTestCases = function(tc, cb) {
  for (var i = 0; i < tc.length; ++i) {
    this.testcases.push(tc[i]);
  }
  this.save(cb);
}

var Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
