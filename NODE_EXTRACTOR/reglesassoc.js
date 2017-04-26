var readline = require("./node-readline");
var model = require("./models");
var fs = require("fs");
var events = require('events');
var eventEmitter = new events.EventEmitter();

module.exports.all = function(scanRes) {
	chercherSyntagmes(scanRes, function(titre, article, categorie, image, syntagmes) {
		console.log("ZOOOB: ", image);
		model.ajouterQuestion({
			titre: titre,
			article: article,
			categorie: categorie,
			validee: false,
			image:  image
		}, syntagmes);
	});
	
}


var chercherSyntagmes = function(scanRes, cb) {
	var texte = scanRes.text;
	var infobox = scanRes.infobox;
	var imgSrc = scanRes.img;
	var url = scanRes.url;
	var regle = "";
	var key = "";
	var regex = "";
	var index = 0;
	var type = "";
 	var mot = "";

 	var syntagmes = [];
 	syntagmes = infobox;

	fs.readFile("./regexText.txt", "utf8", function(err, data){
		var regles = data.split("\n");
		
		for(var i=0; i<regles.length; i++){
			regle = regles[i].split("//")[0];
			key = regle.split("->")[0];
			regex = regle.split("->")[1].split(":::")[0];
			type = regle.split("->")[1].split(":::")[1];

			if( texte.indexOf(key) != -1) {
				//on place l'index sur le mot suivant (+1 pour l'espace)
				index = texte.indexOf(key) + key.length;
				//test de la regex sur les mots suivants (jusqu'a 10 ou match)
				console.log("suivant: "+texte.substring(index) +"\n");
				for (var j=0; j<10; j++){
					var motj = texte.substring(index).split(" ")[j];
					if ( motj !== undefined && motj.match(regex)){
						console.log(texte.indexOf(key));
						console.log("donnée: " + type + " valeur: " + texte.substring(index).split(" ")[j]);
						//ajouter dans bd syntagme[j].data=type et syntagme[j].value=texte[index].split(" ")[i]
						mot = texte.substring(index).split(" ")[j];
						syntagmes.push({data: type, value: mot, points: 0, sameAs: []})

						j = 10; // la regex match, on sort du for
					}
				}
			}

		}
		return cb(scanRes.titre, url, "peche", imgSrc, syntagmes);
	});

	
}