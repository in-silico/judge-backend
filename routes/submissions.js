var express = require('express'),
    multer  = require('multer'),
    path    = require('path'),
    jserver = require('../src/file-server')({dir: './'});

var upload = multer({dest: 'data/submissions/'});
var router = express.Router();

var Submission = require('../models/submission');

function addEventListeners (app) {
  jserver.on('judgement', function (data) {
    console.log('judgement result', data);
    /*
    Submission.update({_id: data._id},
      { $set: {status: data.verdict + ' tmp'}},
      function (err, sub) {
        if (err) return;
    });
    */
  });
}

function parseSubmission (data) {
  data.testcases = data.problem_id.testcases;
  data.path = data.source_code[0].path;
  data.volumen = 'data/problems';
  data.runs = 'data/runs';
  data.memory_limit = data.problem_id.memory_limit || '256';
  data.time_limit = data.problem_id.time_limit || '2';
  data.compilation = "/usr/bin/g++ -o2 -static -pipe -o Main Main.cpp";
  data.execution = "./Main < main.in > main.out";
  data.extension = "cpp";
  data.checker = 'data/default_checker.cpp';
  return data;
}

function addPendingSubmissions () {
  Submission.findWithTestCases({status: 'pending'},
      function(err, data) {

    if (err) throw err;
    for (var i = 0; i < data.length; ++i) {
      jserver.push(parseSubmission(data[i]));
    }
  });
}

function  addPendingSubmission(id) {
  Submission.findByIdWithTestCases(id,
      function(err, data) {

    if (err) throw err;
    jserver.push(parseSubmission(data));
  });
}

module.exports = function(app, mountPoint) {

  addEventListeners(app);
  addPendingSubmissions();

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
      addPendingSubmission(data._id);
    });
  });

  router.get('/pending', function(req, res) {
    Submission.find({status: 'pending'}, function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  })

  jserver.start();
  app.use(mountPoint, router)
}
