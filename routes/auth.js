var express = require('express');
var router = express.Router();
var getUser = require('../local/get_user');

var env = process.env.NODE_ENV || 'development';
var config = require('../config/' + env);

module.exports = function (app, mountPoint, passport) {
  router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect(config.frontend.url);
    });

  router.get('/', function (req, res) {
    res.json(getUser(req));
  });

  app.use(mountPoint, router);
};
