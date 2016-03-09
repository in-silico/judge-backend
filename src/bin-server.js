var server = require('./file-server')();

var data = {
  _id: "56ca75039e43598422cb3064",
  path: "data/submissions/2feba71d5e1bea58ca56ecfe6f65cc07",
  memory_limit: "250",
  time_limit: "3.5",
  compilation: "/usr/bin/g++ -o2 -static -pipe -o source source.cpp",
  execution: "./source < main.in > main.out",
  checker: "checker.cpp",
  testcases: [
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/data.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/data.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/data2.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/data2.out"
    }
  ]
};

var ts = 0;

server.start(function (s) {
  console.log('open server on %j', s.address());
});

function simSubmissions() {
  data._id = ts++;
  server.push(JSON.parse(JSON.stringify(data)));
}

simSubmissions();
setInterval(simSubmissions, 5 * 1000);
