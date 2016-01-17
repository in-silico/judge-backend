var express = require('express'),
    multer  = require('multer');

var upload = multer({dest: 'data/submissions/'});
var router = express.Router();

var Submission = require('../models/submission');

module.exports = function(app, mountPoint) {
  router.get('/', function(req, res) {
    Submission.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.post('/', upload.any(), function(req, res) {
    req.body.source_code = req.files;
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
