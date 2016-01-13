var express = require('express');
var router = express.Router();

var Submission = require('../models/submission');

module.exports = function(app, mountPoint) {
  router.get('/', function(req, res) {
    Submission.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.post('/', function(req, res) {
    Submission.create(req.body, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.get('/pending', function(req, res) {
    Submission.find({status: 'pending'}, function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  })

  app.use(mountPoint, router)
}
