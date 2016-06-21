var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

module.exports = function (app, User, secret, mountPoint) {
  router.post('/register', function (req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Send username and password'});
    } else {
      var newUser = new User({
        username: req.body.name,
        password: req.body.password
      });
      newUser.save(function (err) {
        if (err) {
          return res.json({success: false, msg: 'User exists'});
        }
        res.json(newUser);
      });
    }
  });

  router.post('/', function (req, res) {
    User.findOne({
      username: req.body.username
    }, function (err, user) {
      if (err) {
        throw err;
      }
      if (!user) {
        res.send({success: false, msg: 'Auth failed'});
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(user, secret);
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.send({success: false, msg: 'Auth failed'});
          }
        });
      }
    });
  });

  app.use(mountPoint, router);
};
