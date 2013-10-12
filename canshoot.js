var ranges = {
	laser: [5, 6, 7],
	droid: [3, 4, 5],
	mortar: [2, 3, 4]
};

var players = [{"primary-weapon":{"level":1,"name":"mortar"},"position":"14, 4","name":"kaare","score":-520,"health":26,"secondary-weapon":{"level":1,"name":"droid"}},{"primary-weapon":{"level":1,"name":"laser"},"position":"3, 9","name":"bob","score":-270,"health":100,"secondary-weapon":{"level":1,"name":"droid"}}];
var map = {"data":[["V","V","V","V","V","V","V","V","V","V","V","V","V","V","V"],["V","V","V","V","V","V","V","V","V","V","V","V","V","V","V"],["V","C","C","V","V","O","O","V","G","G","V","V","V","V","V"],["V","E","E","G","V","O","G","G","G","G","S","V","V","V","V"],["V","V","G","G","V","G","G","G","G","G","G","V","V","V","V"],["V","G","G","E","V","V","V","G","G","G","G","G","G","V","V"],["V","C","C","E","G","V","V","G","G","G","G","G","G","V","V"],["V","G","G","G","V","V","V","V","G","G","G","G","G","V","V"],["V","V","G","G","O","G","R","G","G","G","G","G","G","V","V"],["V","V","G","G","G","G","G","R","G","G","G","V","G","G","V"],["V","V","G","G","G","G","G","G","V","G","G","G","G","G","G"],["V","G","G","G","G","G","G","G","V","G","C","C","G","G","G"],["S","G","G","G","G","G","G","G","V","G","E","G","G","V","V"],["V","V","G","O","G","G","O","G","V","C","G","E","O","V","V"],["V","V","V","G","G","V","G","V","V","V","C","V","V","V","V"]],"j-length":15,"k-length":15};

function laserInRange(playerA, playerB) {
	// can player A fire at player B

	// does player A even have a laser
	if(playerA['primary-weapon'].name === "laser" || playerB['secondary-weapon'].name === "laser") {

		var level = 0;

		if(playerA['primary-weapon'].name === "laser") {
			level = playerA['primary-weapon'].level;
		}
		else {
			level playerA['secondary-weapon'].level;
		}

		var range = ranges.laser[level];

		var playerApos = playerA.position.split(' ,');
		var playerBpos = playerB.position.split(' ,');

		playerApos = {
			j: playerA[0],
			k: playerA[1]
		};

		playerBpos = {
			j: playerB[0],
			K: playerB[1]
		};

		// completely out of range
		if(playerB.j === playerA.j && Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range) {
			return true;
		}
		if(playerB.k === playerA.k && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
		if(Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
	}

	return false;
}

function morterInRange(playerA, playerB) {
	// [-range, range] x [-range, range]

		// does player A even have a laser
	if(playerA['primary-weapon'].name === "morter" || playerB['secondary-weapon'].name === "morter") {

		var level = 0;

		if(playerA['primary-weapon'].name === "morter") {
			level = playerA['primary-weapon'].level;
		}
		else {
			level playerA['secondary-weapon'].level;
		}

		var range = ranges.morter[level];

		var playerApos = playerA.position.split(' ,');
		var playerBpos = playerB.position.split(' ,');

		playerApos = {
			j: playerA[0],
			k: playerA[1]
		};

		playerBpos = {
			j: playerB[0],
			K: playerB[1]
		};

		// completely out of range
		if(playerB.j === playerA.j && Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range) {
			return true;
		}
		if(playerB.k === playerA.k && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
		if(Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
	}

	return false;

}

function droidInRange(playerA, playerB) {
	// [-range, range] x [-range, range]

		// does player A even have a laser
	if(playerA['primary-weapon'].name === "morter" || playerB['secondary-weapon'].name === "morter") {

		var level = 0;

		if(playerA['primary-weapon'].name === "morter") {
			level = playerA['primary-weapon'].level;
		}
		else {
			level playerA['secondary-weapon'].level;
		}

		var range = ranges.morter[level];

		var playerApos = playerA.position.split(' ,');
		var playerBpos = playerB.position.split(' ,');

		playerApos = {
			j: playerA[0],
			k: playerA[1]
		};

		playerBpos = {
			j: playerB[0],
			K: playerB[1]
		};

		// completely out of range
		if(playerB.j === playerA.j && Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range) {
			return true;
		}
		if(playerB.k === playerA.k && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
		if(Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
	}

	return false;

}

function inRange(players) {
	playerA = players[0];
	playerB = players[1];

	var weaponsInRange = [];

	if(droidInRange(playerA, playerB)) {
		weaponsInRange.push('droid');
	}

	if(mortarInRange(playerA, playerB)) {
		weaponsInRange.push('mortar');
	}

	if(laserInRange(playerA, playerB)) {
		weaponsInRange.push('laser');
	}

	return weaponsInRange;
}