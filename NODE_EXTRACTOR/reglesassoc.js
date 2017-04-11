var readline = require("./node-readline");

module.exports.all = function(scanRes) {
	var texte = scanRes;
	var combobox = [];
	var regles = readline.fopen("regles.txt", "r");
	var regle = "";
	var key = "";
	var regex = "";
	var index = 0;

	while( !readline.eof(regles) ){
		regle = readline.fgets(regles);
		key = regle.split("->")[0];
		regex = regle.split("->")[1];
		if( texte.indexOf(key) != -1) {
			index = texte.indexOf(key) + key.length() + 1;
			for (var i=0; i<10; i++){
				if ( texte[index].split(" ")[i].match(regex)){
					//ajouter mot à bd 
					i = 10;
				}
			}
		}
	}
}

