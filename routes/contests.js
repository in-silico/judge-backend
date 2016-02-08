var express = require('express');
var router  = express.Router();

var Contest = require('../models/contest');

module.exports = function(app, mountPoint) {
  router.get('/', function(req, res) {
    Contest.find(function(err, data) {
      if (err) throw err;
      res.json(data);
    })
  });

  router.post('/', function(req, res) {
    Contest.create(req.body, function(err, data) {
      if (err) throw err;
      res.setHeader('Access-Control-Allow-Origin','*');
      res.json(data);
    });
  });

  router.post('/add/:id', function(req, res) {
    Contest.find({_id: req.params.id}, function(err, ans) {
      if (err) throw err;
      var contest = ans[0];
      contest.addProblem(req.body, function(err, data) {
        if (err) throw err;
        res.json({ok: true, data: data});
      })
    })
  })

  app.use(mountPoint, router);
}
