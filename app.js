var http = require('http'),
    os   = require('os'),
    express = require('express'),
    logger  = require('morgan'),
    colors  = require('colors');


var app = express();

app.use(logger('dev'));

require('./routes/problems')(app);


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
