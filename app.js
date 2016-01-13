var http = require('http'),
    os   = require('os'),
    express = require('express'),
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


var server = http.createServer(app);
var port = process.env.PORT || 8080;

server.listen(port, function(err) {
  if (err) throw err;
  console.log('Starting server\nAvailable on:'.yellow);
  var ifaces = os.networkInterfaces();
  Object.keys(ifaces).forEach(function (dev) {
    ifaces[dev].forEach(function (details) {
      if (details.family === 'IPv4') {
        console.log(('  ' + 'http://' + details.address + ':' + port.toString()).green);
      }
    });
  });
});

process.on('SIGINT', function() {
  console.log("\nShutdown the server, bye (:".yellow);
  db.close();
  process.exit();
});
