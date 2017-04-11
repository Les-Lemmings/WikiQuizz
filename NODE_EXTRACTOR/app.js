//Bibliothèques annexes
var express = require('express');
var app = express();
var request = require('request');

//Import personnels
var readline = require('./node-readline');
var scanner = require('./scanner');

var regfilename = "./regex.dmtt";


var model = require('./models');
var regles = require('./reglesassoc');


/*model.ajouterQuestion({
	titre: "test",
	article: "https://wikipedia.org/test",
	categorie: "marche"
}, [
{
	data:"test",
	value: "unitaire",
	sameAs:['unit test']
}
]);*/

/*model.trouverNonValidee(function(res) {
	console.log(res);
});*/

model.findRandomQuestion(1, ["peche"], function(res) {
	console.log(res);
});

var regfile = readline.fopen(regfilename, "r");
if(regfile===false) {
	console.log("Error, can't open ", regfilename);
	process.exit(1);
}

var regex_array = new Array();
var count = 0;
while(!readline.eof(regfile)) {
	var line = unescape(encodeURIComponent(readline.fgets(regfile)));
	if(line !== false) {
		reg = new RegExp(line);
		regex_array.push(reg);
	}

	count += 1;
}


function generate(num) {
	num -= 1;
	var scanRes;
	var r = "";
	request('https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard', function(error, response, body) {
		//analyse de la page au hasard reçue.
		scanRes = scanner.scan(response, body);
		console.log(r);
		r = response.request.uri.href;
		console.log(scanRes);
		if(scanRes === "NO") {
			generate(num+1);
		}
		else {
			regles.all(scanRes);
		}
	});

	console.log("NUM: "+num);
	
	if(num > 0) {
		generate(num);
	}
}

app.get('/generate/:num', function(req, res) {
	console.log('générer des données');
	var num = req.params.num;

	console.log("NUM: "+num);

	generate(num);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.send({msg: 'ok'});
	res.end();
});

/**
	Renvoie un tableau json des questions en attente de validation
*/
app.get('/questionsOnHold', function(req, res) {
	console.log('questions en attente');
	model.trouverNonValidee(function(questions) {
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200);
		//res.send(JSON.stringify(questions, null, 3));
		res.json(questions);
		res.end();
	});
});


/**
	Refuser une question
*/
app.get('/removeQuestion/:id', function(req, res) {
	var id= req.params.id;
});

/**
	Accepter une question
*/
app.get('/validateQuestion/:id', function(req, res) {
	var id= req.params.id;
	model.validerQuestionParId(id, function(err, question) {
		if(err) console.log(err);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200);

		res.send({msg: 'ok'});
		res.end();
	});
});



app.listen(3000);
