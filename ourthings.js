var players = {"players":[
	{"primary-weapon": {"level":1,"name":"laser"},
	"position":"3, 10",
	"name":"Nina",
	"score":-4540,
	"alive":true,
	"health":100,
	"secondary-weapon":
	{"level":1,"name":"mortar"}},
	{"primary-weapon":{"level":1,"name":"laser"},
	"position":"12, 0",
	"name":"Geir",
	"score":-4560,
	"alive":true,
	"health":100,
	"secondary-weapon":{"level":1,"name":"mortar"}
	}
]};

players = JSON.parse(players);

function calcDamage(players) {

	var ourhealth;
	if(players[1]['primary-weapon'].name === myname){
		ourhealth = ourhealth - calculateDamage(players[0]['primary-weapon']['name'], players[0]['primary-weapon']['level'], 3);
	}

}

// if can shoot && enemydamage < ourhealth || can shoot and ourdamage > enemyhealth stand and shoot

// if can shoort && enemydamage > ourhealth || can shoot and ourdamage < enemydamage run

// if cannot shoot and not on resource move to resource

// if cannot shoot and on resource mine

// if cannot shoot and can upgrade upgrade

// if cannot shoot and no resources move to enemy


var ourhealth = players[0].health;
var enemyhealth = players[1].health;

var ourdamage = [calculateDamage(players[0]['primary-weapon']['name'], players[0]['primary-weapon']['level'], 3), calculateDamage(players[0]['secondary-weapon']['name'], players[0]['secondary-weapon']['level'], 3)];
var enemydamage = [calculateDamage(players[0]['primary-weapon']['name'], players[0]['primary-weapon']['level'], 3), calculateDamage(players[1]['secondary-weapon']['name'], players[1]['secondary-weapon']['level'], 3)];
var canshoot = canshoot.inRange(players)
if(canshoot.length > 0) {
	
	if(canshoot.indexOf(players[0]['primary-weapon']['name']) !== -1 && ourdamage[0] > enemydamage[0] && ourdamage[0] > enemydamage[1]) {
		shoot(players[0]['primary-weapon']['name'], getDirection(players[1]));
	}
	else if(canshoot.indexOf(players[0]['secondary-weapon']['name']) !== -1 && ourdamage[1] > enemydamage[0] && ourdamage[1] > enemydamage[1]) {
		shoot(players[0]['secondary-weapon']['name'], getDirection(players[1]));
	}

}



