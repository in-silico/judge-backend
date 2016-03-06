var express = require('express'),
    multer  = require('multer'),
    path    = require('path'),
    targz   = require('tar.gz'),
    fs = require('fs');

var router  = express.Router();
var upload = multer({dest: 'data/problems/'});

var Problem = require('../models/problem');

function saveTestCases(req, res, testcases) {
  Problem.find({_id: req.params.id}, function(err, data) {
    if (err)
      return res.status(500).json(err);

    if (data.length == 0)
      return res.json({ok: false, error: 'Problem not found.'});

    var problem = data[0];
    problem.addTestCases(testcases,
        function (err, data) {
          if (err)
            return res.status(500).json(err);

          return res.json(data);
    });
  });
}

function handleSingleFiles(req, res) {
  var ext = {'.in': 0, '.out': 0};
  var ext0 = path.extname(req.files[0].originalname);
  var ext1 = path.extname(req.files[1].originalname);
  ext[ext0]++;
  ext[ext1]++;
  if (ext['.in'] != 1 || ext['.out'] != 1)
    return res.status(400).json({
      ok: false,
      error: 'You must provide exactly one input file and one outputfile.'
    });

  var input  = ext0 === '.in' ? req.files[0].path : req.files[1].path;
  var output = ext0 === '.out' ? req.files[0].path : req.files[1].path;
  saveTestCases(req, res, [{input: input, output: output}]);
}

function handleTar(req, res) {
  if (!(/\.tar\.gz$/.test(req.files[0].originalname))) {
    return res.status(400).json({
      ok: false,
      error: 'You must provide a .tar.gz file'
    });
  }

  var read = fs.createReadStream(req.files[0].path);
  var write = targz().createWriteStream(req.files[0].path + '_data');

  var inputs = {};
  var outputs = {};

  write.on('entry', function(entry) {
    if (path.extname(entry.path) === '.in')
      inputs[entry.path] = true;
    else if (path.extname(entry.path) === '.out')
      outputs[entry.path] = true;
  });

  var basename = req.files[0].path + '_data/';

  write.on('end', function() {
    var testCases = [];
    for (var i in inputs) {
      var output = path.basename(i, '.in') + '.out';
      if (output in outputs)
        testCases.push({input: basename + i, output: basename + output});
    }
    saveTestCases(req, res, testCases);
  });

  read.pipe(write);
}

module.exports = function(app, mountPoint) {
  router.get('/', function(req, res) {
    Problem.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  router.get('/:id', function(req, res) {
    Problem.find({_id: req.params.id}, function(err, data) {
      if (err)
        return res.status(500).json(err);
      return res.json(data[0]);
    })
  });

  router.post('/', function(req, res) {
    Problem.create(req.body, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.post('/:id/tc', upload.any(), function(req, res) {
    if (!req.files || req.files.length == 0) {
      return res.status(400).json({
        ok: false,
        error: 'Wrong number of files.'
      });
    }

    if (req.files.length > 2)
      return res.status(400).json({
        ok: false,
        error: 'Wrong number of files.'
      });

    if (req.files.length == 2)
      handleSingleFiles(req, res);
    else
      handleTar(req, res);
  });

  router.put('/', function(req, res) {
    Problem.update({_id: req.body._id}, req.body, function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  router.del('/', function(req, res) {
    Problem.remove({_id: req.body._id}, function(err, data) {
      if (err) throw err;
      console.log('The problem has been removed');
    });
  });

  app.use(mountPoint, router);
}
