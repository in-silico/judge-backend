var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  author: { type: String, default: '' }
}, {timestamps : true});


var Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
