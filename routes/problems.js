var express = require('express'),
    multer  = require('multer'),
    path    = require('path'),
    gunzip = require('gunzip-maybe'),
    tarStream = require('tar-stream'),
    mkdirp = require('mkdirp'),
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
  var extract = tarStream.extract();
  read.pipe(gunzip()).pipe(extract);

  var basename = req.files[0].path + '_data/';
  mkdirp(basename, function() {

    var inputs = {};
    var outputs = {};

    extract.on('entry', function(entry, stream, cb) {
      if (entry.type === 'file') {
        stream.pipe(fs.createWriteStream(path.join(basename, entry.name)));
        stream.on('end', cb);
        var name = path.join(entry.name);
        if (path.extname(name) === '.in')
          inputs[name] = true;
        else if (path.extname(name) === '.out')
          outputs[name] = true;
      } else {
        cb();
      }
    })

    extract.on('error', function(err) {
      console.log('error ):', err);
      res.status(500).json({ok: false, error: err});
    });

    extract.on('finish', function() {
      var testCases = [];
      for (var i in inputs) {
        var output = path.join(path.dirname(i), path.basename(i, '.in') + '.out');
        if (output in outputs)
          testCases.push({input: basename + i, output: basename + output});
      }
      saveTestCases(req, res, testCases);
    });
  });
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

  app.use(mountPoint, router);
}
