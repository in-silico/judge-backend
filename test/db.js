var tap = require('tap');
var mongoose = require('mongoose');
var env = 'test';
var config = require('../config/' + env);


tap.test('mongodb operations', function(t) {
  mongoose.connect(config.db.url);
  t.equal(config.db.url, 'mongodb://localhost:27017/utpjudge-test');
  var User = require('../models/user');
  User.remove({}, function(err) {
    t.false(err);
  });

  var coolUser = {
    name: 'Judge user',
    email: 'user@judge.utp.edu.co',
    username: 'i dont care'
  };

  User.create(coolUser, function(err, doc) {
    t.false(err);
    User.find(function (err, users) {
      t.false(err);
      tap.match(users[0], coolUser);
      mongoose.connection.close();
      t.end();
    })
  });

});
