function path(map, start, end) {
	
	var openList = [],
		closedList = [start],
		surroundingNodes = surroundingNodes(start);

	

	costSurroundingNodes()

	for(var i = 0; i < surroundingNodes.length; i++) {

	}



}

function costSurroundingNodes(map, surroundingNodes, endNodes) {
	var costArray = [];

	for(var i = 0;i<surroundingNodes.length;i++) {
		costArray.push(gCost(surroundingNodes[i]) + hCost(surroundingNodes[i]));
	}

	return costArray;
}

function gCost(map, adjacentNode) {
	return calculateNodeCost(map[adjacentNode.y][adjacentNode.x]);
}

function hCost(map, currentNode, endNode) {
	var cost = 0;
	var path = []
	var cheapestNode;
	var surroundingNodes = surroundingNodes(currentNode);
	for(var i = 0; i < surroundingNodes; i++) {
		airPath = []
		airDistCost = airDistCost(map, surroundingNodes, endNode, airPath);
	}


}

function airDistCost(map, startNode, endNode) {
	airCost = 0
	adjacentNodes = surroundingNodes(startNode);
	for(var i=0; i < adjacentNodes.length; i++) {
		if(airDistance(map, adjacentNode[i]) < airCost) {
			adjacentNodes
		}
	}
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