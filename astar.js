var pq = require('priority_queue'),
	sets = require('simplesets');


function astar(map, start, end) {
	var map = mapOfNodes(map),
		startNode = map[start.j][start.k],
		endNode = map[start.j][end.k];

	return path(map, startNode, endNode);

}

exports.astar = astar;

function compare(a, b) {
  if (a.fScore < b.fScore)
     return -1;
  if (a.fscore > b.score)
     return 1;
  // a must be equal to b
  return 0;
}

function mapOfNodes(map) {
	jList = []
	for(j = 0; j < map.length; j++) {
		kList = []
		for(k = 0; k < map[0].length; k++) {
			kList.add(
				{
					j: j,
					k: k,
					value: map[j][k]
				});
		}
		jList.push(kList);
	}
}

function path(map, startNode, endNode) {
	

	var closedSet = new sets.Set(),
		openQueue = pq.PriorityQueue(compare),
		cameFrom = {},
		gScore = {},
		fScore = {};

	gScore[startNode.j + "," + startNode.k] = 0
	fScore[startNode.j + "," + startNode.k] = gScore + hCost(map, startNode, endNode);

	while(openQueue.length > 0) {
		current = openQueue.shift();

		if(current === endNode) {
			return reconstructPath(cameFrom, goal);
		}

		closedList.push(current);
		neighbors = surroundingNodes(current);
		for(int i = 0; i < neighbors.length; i++) {
			neighbor = neighbors[i];
			tentativeGScore = gScore[current.j + "" + current.k] + gCost(neighbor);
			tentativeFScore = tenativeGScore + hCost(map, current, neighbor);

			if closedSet.has(neighbor) && tentativeFScore >= fScore[neighbor.j + "," + neighbor.k] {
				// Do nothing
			} else if(elementNotInQueue(queue, neighbor) || tentativeFScore > fScore[neighbor.j + "," + neighbor.k]) {
				cameFrom[neighbor.j + "," + neighbor.k] = current;
				gScore[neighbor.j + "," + neighbor.k] = tentativeGScore;
				fScore[neighbor.j + "," + neighbor.k] = tentativeFScore;
				if(elementNotInQueue(openQueue, neighbor)) {
					openQueue.push(neighbor);
				}

			}
		}
	}
	return {error: "Could not find path"};
}

function reconstructPath(cameFrom, currentNode) {
	if(cameFrom[currentNode.j + "," + curentNode.k] !== "Undefined") {
		path = reconstructPath(cameFrom, cameFrom[currentNode.j + "," + curentNode.k]);
		path.push(currentNode);
		return path;
	} else {
		return [currentNode];
	}
}

function clone(obj) { if (null == obj || "object" != typeof obj) return obj; var copy = obj.constructor(); for (var attr in obj) { if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]; } return copy; }

function elementNotInQueue(queue, element) {
	newQueue = clone(queue);
	while(newQueue.length > 0) {
		if(newQueue.shift() === element) {
			return false;
		}
	}
	return true;
}

function reconstructPath(cameFrom, currentNode) {
	return null;
}

function costSurroundingNodes(map, surroundingNodes, endNode) {
	var costArray = [];

	for(var i = 0;i<surroundingNodes.length;i++) {
		costArray.push(gCost(surroundingNodes[i]) + hCost(map, surroundingNodes[i], endNode));
	}

	return costArray;
}

function gCost(map, node) {
	return calculateNodeCost(map[node.j][node.k]);
}

function hCost(map, currentNode, endNode) {
	var cost = 0,
		path = [],
		cheapestAirPathCost = Number.MAX_VALUE,
		surroundingNodes = surroundingNodes(currentNode),
		airPathCost;

	for(var i = 0; i < surroundingNodes; i++) {
		airPathCost = airPathCost(map, surroundingNodes[i], endNode);

		if(airPathCost < cheapestAirPathCost){
			cheapestAirPathCost = airPathCost;
		}
	}

	return cheapestAirPathCost;
}

function recursiveAirPath(currentNode, endNode, airPath, map) {

	if(currentNode === endNode) {
		return airPath.push(endNode);
	}

	var adjacentNodes = surroundingNodes(currentNode),
		lowestCostNode = {
			airDist: Number.MAX_VALUE,
			j: 0,
			k: 0
		};

	for(var i = 0; i < adjacentNodes.length; i++) {
		var airDistance = airDistance(adjacentNodes[i], endNode);
		if(airDistance < lowestCostNode.airDist) {
			lowestCostNode = adjacentNodes[i];
			lowestCostNode.airDistance = airDistance;
		}
	}

	airPath.push(lowestCostNode);

	recursiveAirPath(lowestCostNode, endNode, map);

	return airPath;
}

function airPathCost(map, startNode, endNode) {
	var airPath = [];
	recursiveAirPath(startNode, endNode, airPath, map);

	var cost = 0;
	for(var i=0;i<airPath.length;i++) {
		cost += calculateNodeCost(getNodeValue(airPath[i])); // get value of node (return node value)
	}

	return cost;
}

function airDistance(currentNode, endNode) {

	var k = endNode.k - currentNode.k;
	var j = endNode.j - currentNode.j;

	var sum = Math.pow(k, 2) + Math.pow(j, 2);
	return Math.sqrt(sum);
}

function surroundingNodes(map, node) {
	var surroundingNodes = [];

	// Move upwards
	if(node.j > 0 && node.k > 0) {
		surroundingNodes.push(map{node.j-1][node.k-1]);
	}

	// Right up
	if(node.j > 0) {
		surroundingNodes.push(map[node.j-1][node.k]);
	}

	// Left up
	if(node.k > 0) {
		surroundingNodes.push(map[node.j][node.k-1]);	
	}

	// Right down
	if(node.k < map[0].length) {
		surroundingNodes.push(map[node.j][node.k+1]);
	}

	// Left down
	if(node.j < map.length) {
		surroundingNodes.push([node.j+1][node.k]);
	}

	// Move down
	if(node.j < map.length && node.k < map[0].length) {
		surroundingNodes.push([node.j+1][node.k+1]);
	}
	return surroundingNodes;
}

function getNodeValue(node, map) {
	return map[node.j][node.k].value;
} 



// heuristic function kinda
function calculateNodeCost(node) {
	var tileCosts = {
		// IMPOSSIBLE TO WALK TO
		V: Number.MAX_VALUE, // VOID
		S: Number.MAX_VALUE, // SPAWN
		O: Number.MAX_VALUE, // ROCK

		// RESOURCES		
		C: 1, // SCRAP - UPGRADE DROID
		E: 1, // EXPLODIUM - UPGRADE LASER
		R: 1,  // RUBIDIUM - UPGRADE LASER
		
		// NEUTRAL
		G: 1 // GRASS
	};

	return tileCosts[node];
}