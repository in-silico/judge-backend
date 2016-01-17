var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
  author: { type: String, default: '' },
  description: { type: String, default: '' },
  testcases: { type: Array, default: []},
  title: { type: String, default: '' }
}, {timestamps : true});


var Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
