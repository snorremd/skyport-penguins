var skyport = require('./nodejs/skyport.js'),
	astar = require('astar.js');

if(process.argv.length != 3){
    console.log("Usage: node penguinwalker.js name_of_the_bot");
    process.exit();
}

var myname = process.argv[2],
	myweapons = [],
	map = [];

function chooseWeapons(map, players) {
	// we should probably look at the map or just go with a fixed weapons strategy
	// available weapons: laser, mortar, droid
	myweapons = ['laser', 'mortar']; // choose weapons

	connection.send_loadout(myweapons[0], myweapons[1]); // tell the server
}

function getPlayerCoordinates(players) {

	coords = {
		us: {j: j, k: k},
		enemy: {j: j, k: k}
	};
}

// from and to are coord objects
function toDirection(from, to) {
	var directon = "";

	if(from.j -1 === to.j && from.k -1 === to.k) {
		direction = "up";
	}
	else if(from.j -1 === to.j && from.k === to.k) {
		direction = "right-up";
	}
	else if(from.j === to.j && from.k - 1 === to.j) {
		direction = "left-up";
	}
	else if(from.j === to.j && from.k + 1 === to.k) {
		direction = "right-down";
	}
	else if(from.j + 1 === to.j && from.k === to.k) {
		direction = "left-down"
	}
	else if(from.j + 1 === to.j && from.k + 1 === to.k) {
		direction = "down";
	}

	return direction;
}

function toCoords(from, direction) {
	if(direction === "up") {
		return { j: from.j-1, k: from.k-1 };
	}

	else if(direction === "right-up") {
		return { j: from.j-1, k: from.k };
	}

	else if(direction === "left-up") {
		return { j: from.j, k: from.k-1 };
	}

	else if(direction === "right-up") {
		return { j: from.j-1, k: from.k };
	}

	else if(direction === "left-up") {
		return { j: from.j, k: from.k-1 };
	}

	else if(direction === "right-down") {
		return { j: from.j, k: from.k+1 };
	}

	else if(direction === "left-down") {
		return { j: from.j+1, k: from.k };
	}

	else if(direction === "down") {
		return { j: from.j+1, k: from.k+1 };		
	}
}

/* --- calculations --- */
/* AOE = level 4 */
function calculateDamage(weapon, level, unusedTurns) {
	unusedTurns = unusedTurns || 1;

	var damage = {
		droid: [22, 24, 26, 10], // lvl 1,2,3, aoe
		mortar: [20, 20, 25, 18],
		laser: [16, 18, 22]
	};

	return Math.round(damage[weapon][level] + unusedTurns*(0.2*damage[weapon][level]));
}

calculateDamage('droid', 2, 1);

// heuristic function kinda
function calculateMovementCost(map, players) {
	var tileCosts = {
		// IMPOSSIBLE TO WALK TO
		V: Number.MAX_VALUE, // VOID
		S: Number.MAX_VALUE, // SPAWN
		O: Number.MAX_VALUE, // ROCK

		// RESOURCES		
		C: 0, // SCRAP - UPGRADE DROID
		E: 0, // EXPLODIUM - UPGRADE MORTER
		R: 0,  // RUBIDIUM - UPGRADE LASER
		
		// NEUTRAL
		G: 0 // GRASS
	};
}

/* --- API ACTION CALLS --- */
function upgrade(){
    // randomly upgrade one of our weapons
    connection.upgrade(randomchoice(myweapons));
}
function mine(){connection.mine();}

function move(direction){
    connection.move(direction);
}

function laser(){
    console.log("Shooting the laser");
    directions = ["up", "down", "left-up", "left-down", "right-up", "right-down"];
    connection.attack_laser(randomchoice(directions));
}
function mortar(){
    console.log("Shooting the mortar");
    // [-4, 4] x [-4, 4] area
    var j = Math.floor(Math.random()*9) - 4;
    var k = Math.floor(Math.random()*9) - 4;
    
    if(j === 0 && k === 0){ // don't hit yourself
		j = 2; // unless you enjoy that kind of thing, that is
		k = 2;
    }
    connection.attack_mortar(j, k); // j,k coordinates relative to our position
}
function droid(){
    console.log("Shooting the droid");
    var commands = [];
    for(i = 0; i < 7; i++){
	commands.push(randomchoice(["up", "down", "left-up", "left-down", "right-up", "right-down"]));
    }
    connection.attack_droid(commands);
}

function movementChoice(list) {}

function got_connection(){
    console.log("got connection, sending handshake...");
    connection.send_handshake(myname);
}
function got_handshake(){console.log("got handshake");}
function got_gamestart(map, players){

    console.log("got gamestart");

    chooseWeapons(map);
}
function got_gamestate(turn_number, map, players){
    console.log("got gamestate");
    if(players[0]["name"] == myname){ // its our turn
		console.log("my turn!");

		var startNode;

		if(players[0].name === myname) {
			startNode = players[0].position.split(', ');
			startNode = {
				j: startNode[0],
				k: startNode[1]
			}
		}

		var endNode = {
			j: 15,
			k: 6
		};

		var nodeList = astar.astar(map, startNode, endNode);

		for(var i = 0;i<3;i++) {
			move(toDirection(nodeList[i], nodeList[i+1]));
		}
		
		console.log('MAP:');
		console.log(JSON.stringify(map));

		console.log('PLAYERS');
		console.log(JSON.stringify(players));
		// randomly shoot one of the weapons, upgrade or mine the tile
		// randomchoice([laser, mortar, droid, upgrade, mine])();
    }
}







function got_action(type, from, rest){console.log("got action");}
function got_error(message){console.log("got error: '" + message + "'");}
function got_endturn(){console.log("got endturn");}

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