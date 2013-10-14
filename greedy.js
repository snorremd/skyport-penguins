function next(map, from, to, visited) {
	// console.log('greedy ' + JSON.stringify(from) + JSON.stringify(to) + JSON.stringify(visited));

	var lowestCostNode = null,
		distance = 9999,
		currDistance,
		possibleMovesArr = possibleMoves(map, from);

	for(var i =0;i<possibleMovesArr.length; i++) {
		if(typeof visited === "undefined" || !visited || visited.indexOf(possibleMovesArr[i]) === -1) {
			currDistance = calcDistance(possibleMovesArr[i], to);
			if(currDistance < distance) {
				distance = currDistance;
				lowestCostNode = possibleMovesArr[i];
			}
		}
	}

	console.log('greedy best returns: ' + JSON.stringify(lowestCostNode));
	return lowestCostNode;
}

exports.next = next;

function calcDistance(from, to) {
	// console.log('distance' + JSON.stringify(from) + JSON.stringify(to));
	var k = from.k,
		j = from.j,
		dk = Math.abs(k - to.k),
		dj = Math.abs(j - from.j);

	var distance = 0;
	if (dk < dj / 2) {
		distance = dj;
	} else {
		distance = (dj + dk - Math.floor(dj / 2));
	}

	if (j % 2 === 0) {
		if (dj % 2 == 1 && k > point.k) {
			distance--;
		}
	} else if (dj % 2 == 1 && k < point.k) {
		distance--;
	}

	// console.log('distance returned ' + distance);
	return distance;
}

function getValue(map, node) {
	// console.log('value of ' + JSON.stringify(node));
	if(typeof map[node.j] === "undefined" || typeof map[node.j][node.k] === "undefined") {
		return "V";
	}

	// console.log('value: ' + map[node.j][node.k]);
	return map[node.j][node.k];
}

function isMovable(map, node) {
	var nodeValue = getValue(map, node);
	if(typeof nodeValue === "undefined" || nodeValue === 'V' || nodeValue === 'O' || nodeValue === 'S') {
		return false;
	}
	return true;
}

function possibleMoves(map, node) {
	// console.log('possible moves from' + JSON.stringify(node));
	if(!node) {
		console.log('NULL');
		return [];
	}
  var surroundingNodes = [],
      toNode;

    node = {
    	j: parseInt(node.j, 10),
    	k: parseInt(node.k, 10)
    };

  // Move upwards

  	// console.log(JSON.stringify(node));
    toNode = {j: (node.j-1), k: (node.k-1)};
    // console.log(JSON.stringify(node));
    if(isMovable(map, toNode)) {
		surroundingNodes.push(toNode);
    }
  

  // Right up

    toNode = {j: (node.j-1), k: node.k};
    // console.log(JSON.stringify(node));
    if(isMovable(map, toNode)) {
		surroundingNodes.push(toNode);
    }
  

  // Left up

    toNode = {j: node.j, k: (node.k-1)};
    // console.log(JSON.stringify(node));
    if(isMovable(map, toNode)) {
		surroundingNodes.push(toNode);
    }
  

  // Right down

    toNode = {j: node.j, k: (node.k+1)};
    // console.log(JSON.stringify(node));
    if(isMovable(map, toNode)) {
		surroundingNodes.push(toNode);
    }
  

  // Left down

    toNode = {j: (node.j+1), k: node.k};
    // console.log(JSON.stringify(node));
    if(isMovable(map, toNode)) {
		surroundingNodes.push(toNode);
    }
  

	// Move down
	toNode = {j: (node.j+1), k: (node.k+1)};
	// console.log(JSON.stringify(node));
	if(isMovable(map, toNode)) {
		surroundingNodes.push(toNode);
	}

  // console.log('surrounding returned: ' + JSON.stringify(surroundingNodes));
  return surroundingNodes;
}