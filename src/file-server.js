var fs = require('fs');
var net = require('net');
var path = require('path');
var StreamSet = require('stream-set');
var Deque = require('deque-ds');

var util = require('util');
var events = require('events');

module.exports = JServer;

var self;
function JServer(opts) {
  if (!(this instanceof JServer)) return new JServer(opts);
  if (!opts) opts = {}
  this._dir = opts.dir || '../';
  this._port = opts.port || 7777;
  this.actives = StreamSet();
  this.pending = Deque();
  this.bots = Deque();
  events.EventEmitter.call(this);

  self = this;
}

util.inherits(JServer, events.EventEmitter);

JServer.prototype.start = function(cb) {
  self.server = net.createServer(self.handleConnection);
  self.server.listen(self._port, function () {
    if (cb)
      cb(self.server);
  });
}

JServer.prototype.handleConnection = function(socket) {
  self.actives.add(socket);
  self.bots.push_back(socket);
  self.checkPending();

  socket.on('data', function(data) {
    var msg = data.toString().split('\0');
    for (var i = 0; i < msg.length; ++i) {
      if (msg[i].length === 0) continue;
      var cur  = JSON.parse(msg[i]);
      var op = cur[0];
      if (op === 'judgement')
        return self.handleJudgement(socket, cur[1]);

      if (op === 'ready')
        return self.bots.push_back(socket);

      if (op === 'file')
        return self.handleFile(socket, cur[1]);
    }
  });
}

JServer.prototype.handleFile = function(socket, data) {
  console.log('getting file', data);
  var stream = fs.createReadStream(path.join(this._dir, data));
  //stream.pipe(socket);
  stream.on('data', function(chunk) {
    var msg = ['file', data, chunk];
    socket.write(JSON.stringify(msg) + '\0');
  });

  stream.once('end', function() {
    var msg = ['endfile', data];
    socket.write(JSON.stringify(msg) + '\0');
  });
}

JServer.prototype.handleJudgement = function(socket, data) {
  self.emit('judgement', data);
  self.bots.push_back(socket);
  self.checkPending();
}

JServer.prototype.judge = function(data) {
  while (!self.actives.has(self.bots.front()) &&
          self.bots.size() > 0) {

    self.bots.pop_front();
  }

  if (self.bots.size() == 0)
    return false;

  var cur = self.bots.pop_front();
  data = ['submission', data];
  cur.write(JSON.stringify(data) + '\0');
  return true;
}

JServer.prototype.push = function(data) {
  self.pending.push_back(data);
  self.checkPending();
}

JServer.prototype.checkPending = function() {
  console.log('pending', self.pending.size() +
      ' pendings on ' + self.bots.size() + ' bots');

  if (self.pending.size() == 0) return;
  if (self.judge(self.pending.front())) {
    self.pending.pop_front();
  }
}
