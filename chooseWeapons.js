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

	return myWeapons;

	
}

exports.chooseWeapons = chooseWeapons;