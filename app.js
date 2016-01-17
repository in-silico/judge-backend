var express = require('express'),
    logger  = require('morgan'),
    colors  = require('colors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);

var app = express();
mongoose.connect(config.db.url);
app.db = mongoose.connection;

app.db.on('open', function() {
  console.log('connected to db'.yellow);
});

app.use(logger('dev'));
app.use(bodyParser.json());

require('./routes/users')(app, '/users');
require('./routes/problems')(app, '/problems');
require('./routes/submissions')(app, '/submissions');
require('./routes/contests')(app, '/contests');


/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
  res.status(404).json({ok: "false", error: "not found"});
});

module.exports = app;
