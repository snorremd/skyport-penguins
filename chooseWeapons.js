var map = [
	["V","V","V","V","V","V","V","V","V","V","V","V","V","V","V"],
	["V","V","V","V","V","V","V","V","V","V","V","V","V","V","V"],
	["V","C","C","V","V","O","O","V","G","G","V","V","V","V","V"],
	["V","E","E","G","V","O","G","G","G","G","S","V","V","V","V"],
	["V","V","G","G","V","G","G","G","G","G","G","V","V","V","V"],
	["V","G","G","E","V","V","V","G","G","G","G","G","G","V","V"],
	["V","C","C","E","G","V","V","G","G","G","G","G","G","V","V"],
	["V","G","G","G","V","V","V","V","G","G","G","G","G","V","V"],
	["V","V","G","G","O","G","R","G","G","G","G","G","G","V","V"],
	["V","V","G","G","G","G","G","R","G","G","G","V","G","G","V"],
	["V","V","G","G","G","G","G","G","V","G","G","G","G","G","G"],
	["V","G","G","G","G","G","G","G","V","G","C","C","G","G","G"],
	["S","G","G","G","G","G","G","G","V","G","E","G","G","V","V"],
	["V","V","G","O","G","G","O","G","V","C","G","E","O","V","V"],
	["V","V","V","G","G","V","G","V","V","V","C","V","V","V","V"]
];

function chooseWeapons(map) {
	var c = "";
	var e = "";
	var r = "";

	for (var i=0; i<map.length; i++) {
		for (var j = 0; j<map[i].length; j++) {
			console.log(map[i][j]);
			if(map[i][j].toLowerCase() === 'c'){
				c++;
			} 
			else if(map[i][j].toLowerCase() === 'e'){
				e++;
			}
			else if(map[i][j].toLowerCase() === 'r'){
				r++;
			}
		}
	}
	var minerals = [];
	minerals[0] = c;
	minerals[1] = e;
	minerals[2] = r;
	minerals.sort();
	minerals.reverse();

	if(minerals[0].toLowerCase === 'c' && minerals[1].toLowerCase === 'e' || minerals[0].toLowerCase === 'e' && minerals[1].toLowerCase === 'c'){
		myweapons = ['droid', 'mortar'];
	}

	else if(minerals[0].toLowerCase === 'c' && minerals[1].toLowerCase === 'r' || minerals[0].toLowerCase === 'r' && minerals[1].toLowerCase === 'c'){
		myweapons = ['droid', 'laser'];
	}

	else if(minerals[0].toLowerCase === 'e' && minerals[1].toLowerCase === 'r' || minerals[0].toLowerCase === 'r' && minerals[1].toLowerCase === 'e'){
		myweapons = ['mortar', 'laser'];
	}
}

chooseWeapons(map);
