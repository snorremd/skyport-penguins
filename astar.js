var PriorityQueue = require('libs/priorityQueue.js');

function astar() {

}

exports.astar = astar;

function path(map, startNode, endNode) {
	
	var openList = [],
		closedList = [startNode],
		surroundingNodes = surroundingNodes(startNode),
		cheapestNode,
		lowestFScore = Number.MAX_VALUE,
		openQueue = PriorityQueue({ low: true });

	costSurroundingNodes = costSurroundingNodes(map, startNode, endNode);

	for(var i = 0; i < surroundingNodes.length; i++) {
		surroundingNodes[i].fScore = gCost(surroundingNodes[i]); + hCost(map, surroundingNodes[i], endNode);
		openQueue.push(surroundingNodes[i], surroundingNodes[i].fScore);
	}

}

function costSurroundingNodes(map, surroundingNodes, endNode) {
	var costArray = [];

	for(var i = 0;i<surroundingNodes.length;i++) {
		costArray.push(gCost(surroundingNodes[i]) + hCost(map, surroundingNodes[i], endNode));
	}

	return costArray;
}

function gCost(map, adjacentNode) {
	return calculateNodeCost(map[adjacentNode.y][adjacentNode.x]);
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

function recursiveAirDistance(currentNode, endNode, airPath, map) {

	if(currentNode === endNode) {
		return airPath.push(endNode);
	}

	var adjacentNodes = surroundingNodes(currentNode),
		lowestCostNode = {
			airDist: Number.MAX_VALUE,
			x: 0,
			y: 0
		};

	for(var i = 0;i < adjacentNodes.length;i++) {
		var airDistance = airDistance(map, adjacentNodes[i], endNode);
		if(airDistance < lowestCostNode.airDist) {
			lowestCostNode = {
				airDist: airDistance,
				x: adjacentNodes.x,
				y: adjacentNodes.y
			}
		}
	}

	airPath.push(lowestCostNode);

	recursiveAirDistance(lowestCostNode, endNode, map);

	return airPath;
}

function airPathCost(map, startNode, endNode, airPath) {

	var cost = 0;

	for(var i=0;i<airPath.length;i++) {
		cost += calculateNodeCost(getNodeValue(airPath[i])); // get value of node (return node value)
	}

	return cost;
}

function airDistance(map, node, endNode) {

	var k = endNode.k - currentNode.k;
	var j = endNode.j - currentNode.j;

	var sum = Math.pow(k, 2) + Math.pow(j, 2);
	return Math.sqrt(sum);
}

function surroundingNodes(start) {
	var surroundingNodes = [];

	// Move upwards
	if(start[0] > 0 && start[1] > 0) {
		surroundingNodes.push({j: start[0]-1, k: start[1]-1});
	}

	// Right up
	if(start[0] > 0) {
		surroundingNodes.push({j: start[0]-1, k: start[1]});
	}

	// Left up
	if(start[1] > 0) {
		surroundingNodes.push({j: start[0], k: start[1]-1});	
	}

	// Right down
	if(start[1] < map[0].length) {
		surroundingNodes.push({j: start[0], k: start[1]+1});
	}

	// Left down
	if(start[0] < map.length) {
		surroundingNodes.push({j: start[0]+1, k: start[1]});
	}

	// Move down
	if(start[0] < map.length && start[1] < map[0].length) {
		surroundingNodes.push({j: start[0]+1, k: start[1]+1});
	}
	return surroundingNodes;
}

function getNodeValue(node, map) {
	return map[node.j][node.k];
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