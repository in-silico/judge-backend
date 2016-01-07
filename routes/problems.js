
var _example = [
  {
    name: "Toby and the judge",
    desc: "This is a description",
    timeLimit: 1.5,
    memoryLimit: 256
  },
  {
    name: "One more problem",
    desc: "asdfasdfasd",
    timeLimit: 3.5,
    memoryLimit: 356
  }
];

module.exports = function(app) {
  app.get('/problems', function(req, res) {
    res.json({ok: true, data: _example});
  });
}
