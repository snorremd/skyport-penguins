function compare(a, b) {
  if (a.fScore < b.fScore)
     return -1;
  if (a.fscore > b.score)
     return 1;
  // a must be equal to b
  return 0;
}

var pq = require('priority_queue');

// create a queue
var q = new pq.PriorityQueue(compare);

// push some elements
q.push({k: 2, j: 10, fScore: 5},{k: 2, j: 10, fScore: 5},{k: 10, j: 20, fScore: 10},{k: 22, j: 28, fScore: 20});

// shift 'em out ...
while (q.length > 0) {
  console.log(q.shift());
}