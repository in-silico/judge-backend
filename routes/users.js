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

  app.use(mountPoint, router)
}
