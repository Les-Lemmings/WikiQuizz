var readline = require("./node-readline");
var model = require("./models");
var fs = require("fs");

module.exports.all = function(scanRes) {
	var texte = scanRes;
	var infobox = [];
	var regle = "";
	var key = "";
	var regex = "";
	var index = 0;
	var type = "";
 	var mot = "";

 	var syntagmes = [];

	fs.readFile("./regexText.txt", "utf8", function(err, data){
		var regles = data.split("\n");
		
		for(var i=0; i<regles.length; i++){
			regle = regles[i].split("//")[0];
			key = regle.split("->")[0];
			regex = regle.split("->")[1].split(":")[0];
			type = regle.split("->")[1].split(":")[1];

			if( texte.indexOf(key) != -1) {
			//on place l'index sur le mot suivant (+1 pour l'espace)
			index = texte.indexOf(key) + key.length + 1;
			//test de la regex sur les mots suivants (jusqu'a 10 ou match)
				console.log("suivant: "+texte.substring(index) +"\n");
				for (var j=0; j<10; j++){
					if ( texte.substring(index).split(" ")[j].match(regex)){
						console.log("donnée: " + type + " valeur: " + texte.substring(index).split(" ")[j]);
						//ajouter dans bd syntagme[j].data=type et syntagme[j].value=texte[index].split(" ")[i]
						mot = texte.substring(index).split(" ")[j];
						syntagmes.push({data: type, value: mot, points: 0, sameAs: []})

						j = 10; // la regex match, on sort du for
					}
				}
			}
		}
		model.ajouterQuestion({
			titre: scanRes.titre,
			article: scanRes.article,
			categorie: "peche",
			validee: false,
			image: scanRes.images || null
		}, syntagmes);


	});

	/*while( !readline.eof(regles) ){
		regle = readline.fgets(regles).split("//")[0].split("->");
		key = regle[0];
		console.log(key);
		regex = regle[1].split(":")[0];
		data = regle[1].split(":")[1];
		//si key est existant dans le texte (renvoie sa position)
		if( texte.indexOf(key) != -1) {
			//on place l'index sur le mot suivant (+1 pour l'espace)
			index = texte.indexOf(key) + key.length() + 1;
			//test de la regex sur les mots suivants (jusqu'a 10 ou match)
			for (var i=0; i<10; i++){
				if ( texte[index].split(" ")[i].match(regex)){
					console.log("donnée: " + data + " valeur: " + texte[index].split(" ")[i]);
					//ajouter dans bd syntagme[i].data=data et syntagme[i].value=texte[index].split(" ")[i]
					i = 10; // la regex match, on sort du for
				}
			}
		}*/
	




}


