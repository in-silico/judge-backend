var express = require('express');
var router = express.Router();
var getUser = require('../local/get_user');


module.exports = function(app, mountPoint, passport) {

  router.get('/github/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://judge.is');
  });

  router.get('/', function(req, res) {
    res.json(getUser(req));
  });

  app.use(mountPoint, router)
}

