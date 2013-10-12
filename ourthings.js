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

var ourhealth;

if(players[1]['primary-weapon'].name === myname){
	ourhealth = ourhealth - calculateDamage(players[0]['primary-weapon']['name'], players[0]['primary-weapon']['level'], 3);
}