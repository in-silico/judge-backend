var express = require('express'),
    logger  = require('morgan'),
    colors  = require('colors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var env = process.env.NODE_ENV || 'development';
var config = require('./config/' + env);

var app = express();
mongoose.connect(config.db.url);
var db = mongoose.connection;

db.on('open', function() {
  console.log('connected to db'.yellow);
});

app.use(logger('dev'));
app.use(bodyParser.json());

require('./routes/users')(app, '/users');
require('./routes/problems')(app, '/problems');
require('./routes/submissions')(app, '/submissions');

module.exports = app;
