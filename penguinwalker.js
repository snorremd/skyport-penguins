var skyport = require('./nodejs/skyport.js'),
	greedy = require('./greedy.js'),
	canshoot = require('./canshoot.js'),
	mineR = 0,
	mineE = 0;

if(process.argv.length != 3){
	console.log("Usage: node penguinwalker.js name_of_the_bot");
	process.exit();
}

var myname = process.argv[2],
	myweapons = [],
	map = [];

function shoot(weapon, from, to) {
	if(weapon === "laser") {
		laser(from,to);
	}
	if(weapon === 'mortar') {
		mortar(from, to);
	}
}

function laser(ourCoords, theirCoords){
	var direction = getDirection(ourCoords, theirCoords);
    console.log("Shooting the laser " + direction);

    connection.attack_laser(direction);
}

function mortar(ourCoords, theirCoords){
    console.log("Shooting the mortar");

    ourCoords.j;
    ourCoords.k;

    var j = theirCoords.j - ourCoords.j;
    var k = theirCoords.k - ourCoords.k;

    if(j === 0 && k === 0){ // don't hit yourself
		j = 2; // unless you enjoy that kind of thing, that is
		k = 2;
    }
    connection.attack_mortar(j, k); // j,k coordinates relative to our position
}

function getDirection(from, to) {
	from = {
		j: parseInt(from.j, 10),
		k: parseInt(from.k, 10)
	};
	to = {
		j: parseInt(to.j, 10),
		k: parseInt(to.k, 10)
	};
	var direction = "up";

	// console.log('getDirection: ' + JSON.stringify(from) + JSON.stringify(to));

	if(from.j > to.j && from.k > to.k) {
		direction = "up";
	}
	else if(from.j < to.j && from.k < to.k) {
		direction = "down";
	}
	else if(from.j > to.j && from.k == to.k) {
		direction = "right-up";
	}
	else if(from.j == to.j && from.k > to.k) {
		direction = "left-up";
	}
	else if(from.j == to.j && from.k < to.k) {
		direction = "right-down";
	}
	else if(from.j < to.j && from.k == to.k) {
		direction = "left-down";
	}
	

	return direction;
}

function move(direction){
	// console.log('MOVE: ' + direction);
	connection.move(direction);
}

function canUpgrade(weapon, level) {
	level = level-1;
	var resourcesNeeded = {
		laser: [3, 5],
		mortar: [3, 5]
	};

	if(level >= 3) {
		return false;
	}
	else if(weapon == 'laser') {
		if(mineR >= resourcesNeeded.laser[level-1]) {
			return true;
		}
		return false;
	}
	else if(weapon == 'mortar') {
		if(mineE >= resourcesNeeded.mortar[level-1]) {
			return true;
		}
		return false;
	}

	return false;
}

function getCoordinates(player) {
	var playerCoords = player.position.split(', ');
		playerCoords = {
			j: playerCoords[0],
			k: playerCoords[1]
		};
	return playerCoords;
}

function got_connection(){
	console.log("got connection, sending handshake...");
	connection.send_handshake(myname);
}
function got_handshake(){console.log("got handshake");}
function got_gamestart(map, players){

	// myweapons = chooseWeapons.chooseWeapons(map);

	myweapons = ['laser', 'mortar'];

	connection.send_loadout(myweapons[0], myweapons[1]); // tell the server

	console.log("got gamestart");
}

var endNode = false;

function got_gamestate(turn_number, map, players){
	map = map.data;

	if(players[0].name === myname) {
		var ourCoords = getCoordinates(players[0]),
			enemyCoords = getCoordinates(players[1]);

		
		if(canshoot.laserInRange(players[0], players[1])) {
			shoot('laser', ourCoords, enemyCoords);
		}
		
		else if(canshoot.mortarInRange(players[0], players[1])) {
			shoot('mortar', ourCoords, enemyCoords);
		}

		else if(map[ourCoords.j][ourCoords.k] == "E" || map[ourCoords.j][ourCoords.k] == "R") {
			mine();
			endNode = false;
		}
		else {
			console.log('LASER: ' + canshoot.laserInRange(players[0], players[1]));
			console.log('MORTAR: ' + canshoot.mortarInRange(players[0], players[1]));

			// find resource
			if(!endNode) {
				for(var i =0;i<map.length;i++) {
					for(var j = 0;j<map[i].length;j++) {
						if(map[i][j] == "E" || map[i][j] == "R") {
							endNode = { j: i, k: j};
							break;
						}
					}
				}
				endNode = false;
			}

			if(!endNode) {
				endNode = enemyCoords;
			}

			console.log('ENDNODE: ' + endNode);

			var nodesList = [];
				var next = greedy.next(map, ourCoords, endNode, nodesList);
				nodesList.push(next);

				next = greedy.next(map, nodesList[0], endNode, nodesList);
				console.log(nodesList);
				nodesList.push(next);

				next = greedy.next(map, nodesList[1], endNode, nodesList);
				nodesList.push(next);

				console.log('NODESLIST: ' + JSON.stringify(nodesList));

				move(getDirection(ourCoords, greedy.next(map, ourCoords, endNode)));
				move(getDirection(nodesList[0], nodesList[1]));
				move(getDirection(nodesList[1], nodesList[2]));
		}
	}

}


function got_action(type, from, rest){//console.log("got action");
}
function got_error(message){console.log("got error: '" + message + "'");}
function got_endturn(){//console.log("got endturn");
}

// Establish the connection
connection = new skyport.SkyportConnection("localhost", 54321);

// Register these callbacks. SkyportConnection will call the
// provided callback function when something of interest happens
connection.on('connection', got_connection);
connection.on('handshake', got_handshake);
connection.on('gamestart', got_gamestart);
connection.on('gamestate', got_gamestate);
connection.on('action', got_action);
connection.on('error', got_error);
connection.on('endturn', got_endturn);
connection.connect();