var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: { type: String, default: '' },
  email: { type: String, default: '' },
  username: { type: String, default: '' }
}, {timestamps : true});


var User = mongoose.model('User', userSchema);
module.exports = User;
