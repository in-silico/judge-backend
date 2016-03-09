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

  router.get('/:id', function(req, res) {
    User.find({_id: req.params.id}, function(err, data) {
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

  router.put('/:id', function(req, res) {
    User.update({_id: req.params.id}, req.body, function(err, data) {
      if (err) throw err;
      res.json(data);
      console.log(req.body);
    });
  });

  router.delete('/:id', function(req, res) {
    User.remove({_id: req.params.id}, function(err, data) {
      if (err) throw err;
      console.log('The user has been removed');
    });
  });

  app.use(mountPoint, router)
}
