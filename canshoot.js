var ranges = {
	laser: [5, 6, 7],
	droid: [3, 4, 5],
	mortar: [2, 3, 4]
};

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

function laserInRange(playerA, playerB) {
	// can player A fire at player B

	// does player A even have a laser
	if(playerA['primary-weapon'].name === "laser" || playerB['secondary-weapon'].name === "laser") {

		var level = 0;

		if(playerA['primary-weapon'].name === "laser") {
			level = playerA['primary-weapon'].level;
		}
		else {
			level = playerA['secondary-weapon'].level;
		}

		var range = ranges.laser[level];

		console.log('laser range: ' + range);

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
		if(playerB.j == playerA.j && Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range) {
			return true;
		}
		if(playerB.k == playerA.k && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
		if(Math.sqrt(Math.pow(playerB.k - playerA.k, 2)) <= range && Math.sqrt(Math.pow(playerB.j - playerA.j, 2)) <= range) {
			return true;
		}
	}

	return false;
}

exports.laserInRange = laserInRange;

function mortarInRange(playerA, playerB) {
	// [-range, range] x [-range, range]

		// does player A even have a laser
	if(playerA['primary-weapon'].name === "morter" || playerA['secondary-weapon'].name === "morter") {

		var level = 0;

		if(playerA['primary-weapon'].name === "morter") {
			level = playerA['primary-weapon'].level;
		}
		else {
			level = playerA['secondary-weapon'].level;
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

		if(calcDistance(playerApos, playerBpos) <= range) {
			return true;
		}
	}

	return false;

}

exports.mortarInRange = mortarInRange;

function droidInRange(playerA, playerB) {
	// [-range, range] x [-range, range]

		// does player A even have a laser
	if(playerA['primary-weapon'].name === "morter" || playerB['secondary-weapon'].name === "morter") {

		var level = 0;

		if(playerA['primary-weapon'].name === "morter") {
			level = playerA['primary-weapon'].level;
		}
		else {
			level = playerA['secondary-weapon'].level;
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

		if(distance(playerApos, playerBpos) <= range) {
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

exports.inRange = inRange;







