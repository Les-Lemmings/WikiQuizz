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
var cors = require('cors');
var bodyParser = require('body-parser');
let wait = require('wait.for');

app.use(cors());

app.use(bodyParser.json());


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
	//console.log('RANDOM : ' + res);
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
	//https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard
	//https://fr.wikipedia.org/wiki/Résolution_413_du_Conseil_de_sécurité_des_Nations_unies
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
};

var scanning = function(scanRes) {
	console.log('SCANNING');
	regles.all(scanRes);
};

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
/*app.get('/validateQuestion/:id', function(req, res) {
	var id= req.params.id;
	//var 
	model.validerQuestionParId(id, function(err, question) {
		if(err) console.log(err);
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200);

		res.send({msg: 'ok'});
		res.end();
	});

});*/

app.post('/validateQuestion', function(req, res) {
	console.log('Validating...');
	//res.addHeader('Access-Control-Allow-Headers', 'Content-Type');

	model.validerQuestion(req.body, function(err, question) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		//res.status(200);
		res.json({msg:"ok"});
		res.end();
	});
	
});


app.get('/requestQuestions', function(req, res) {
	var nb = req.query.nb;
	var categories = req.query.cat;
	categories = categories.split(';');

	console.log(nb, categories);

	wait.launchFiber(model.findRandomQuestion, nb, categories, function(err, questions) {
        //console.log("Questions:"+ questions);
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200);
        //res.send(JSON.stringify(questions, null, 3));
        res.json(questions);
        res.end();
    });

	/*model.findRandomQuestion(nb, categories, function(err, questions) {
		//console.log("Questions:"+ questions);
		res.setHeader('Content-Type', 'application/json');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.status(200);
		//res.send(JSON.stringify(questions, null, 3));
		res.json(questions);
		res.end();
	});*/
});

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}


/* Fonction calculant la distance de levenshtein */
function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function comparerReponses(r1, r2) {
	let levenshtein = similarity(r1,r2);
	console.log("s1: "+r1+"\ns2: "+r2+"\ndistance: "+levenshtein+"\n\n");
	return levenshtein > 0.6;
}

function calculerScore(qr) {

	qr.score = 0;

	console.log(qr.length);

	for (let i = 0; i < qr.length; i++) {
        qr[i].score = 0;
		for (let j = 0; j < qr[i].syntagmes.length; j++) {

			if(comparerReponses(qr[i].syntagmes[j].value, qr[i].syntagmes[j].reponse)) {
				qr[i].score += 1;
				qr.score += 1;
                qr[i].syntagmes[j].resultat = true;
			}
			else {
                qr[i].syntagmes[j].resultat = false;
			}
		}
	}

	return qr;
}

app.post('/calculerScore', function(req, res) {
	let qr = req.body;

	qr = calculerScore(qr);

	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.json(qr);
	res.end();
});



model.invaliderToutesQuestions(function() {

});

app.listen(4000, function () {
	console.log('Server listening on port 4000');
});

