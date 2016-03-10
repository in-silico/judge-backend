var server = require('./file-server')();

var data = {
  _id: "56ca75039e43598422cb3064",
  path: "data/submissions/fa95908e5ad145ad5b05363e0c9c9d3d",
  volumen: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data",
  runs: "data/runs",
  memory_limit: "250",
  time_limit: "3.5",
  compilation: "/usr/bin/g++ -o2 -static -pipe -o Main Main.cpp",
  execution: "./Main < main.in > main.out",
  extension: "cpp",
  checker: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/checker.cpp",
  testcases: [
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/1.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/1.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/2.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/2.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/3.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/3.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/4.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/4.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/5.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/5.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/6.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/6.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/7.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/7.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/8.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/8.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/9.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/9.out"
    },
    {
      in: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/10.in",
      out: "data/problems/4614da7f5a1f5a6c7c98c7fd4ed04122_data/10.out"
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
setInterval(simSubmissions, 10 * 1000);
