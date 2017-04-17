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

var async = require('async');


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

model.findRandomQuestion(1, ["peche"], function(err, res) {
	console.log('RANDOM : ' + res);
});

/*var regfile = readline.fopen(regfilename, "r");
if(regfile===false) {
	console.log("Error, can't open ", regfilename);
	process.exit(1);
}

var regex_array = new Array();
var count = 0;
while(!readline.eof(regfile)) {
	var line = unescape(encodeURIComponent(readline.fgets(regfile)));
	if(line !== false) {
		//reg = new RegExp(line);
		//regex_array.push(reg);
	}

	count += 1;
}*/


var generate = function() {
	
	var scanRes;
	var r = "";	

	request('https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard', function(error, response, body) {
		//analyse de la page au hasard reçue.
		scanRes = scanner.scan(response, body);
		console.log(r);
		r = response.request.uri.href;
		console.log(scanRes);
		if(scanRes === "NO") {
			console.log('NOOOOOOOOO');
			generate();
		}
		else {
			console.log('YESSSSSS');
			scanning(scanRes);
		}
	});	
}

var scanning = function(scanRes) {
	console.log('SCANNING');
	regles.all(scanRes);
}

app.get('/generate/:num', function(req, res) {
	console.log('générer des données');
	var num = req.params.num;

	for(var i = 0; i< num; i++) {
		generate();
	}
	

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
	model.removeQuestionById(id, function(err, question) {
		if(err) { throw err; }

		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200);
		//res.send(JSON.stringify(questions, null, 3));
		res.json({msg : 'ok'});
		res.end();
	});
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


app.get('/requestQuestions', function(req, res) {
	var nb = req.query.nb;
	var categories = req.query.cat;
	categories = categories.split(';');

	console.log(nb, categories);

	model.findRandomQuestion(nb, categories, function(err, questions) {
		console.log("Questions:"+ questions);
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200);
		//res.send(JSON.stringify(questions, null, 3));
		res.json(questions);
		res.end();
	});
});



model.invaliderToutesQuestions(function() {

});

app.listen(4000, function () {
	console.log('Server listening on port 4000');
});

