var express = require('express');
var router = express.Router();

var User = require('../models/user');

module.exports = function(app, mountPoint) {
  router.get('/', function(req, res) {
    User.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.post('/', function(req, res) {
    User.create(req.body, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.put('/', function(req, res) {
    User.update({_id: req.body._id}, req.body, function(err, data) {
      if (err) throw err;
      res.json(data);
      console.log(req.body);
    });
  });

  router.delete('/', function(req, res) {
    User.remove({_id: req.body._id}, function(err, data) {
      if (err) throw err;
      console.log('The user has been removed');
    });
  });

  app.use(mountPoint, router)
}
