//Bibliothèques annexes
var express = require('express');
var app = express();
var request = require('request');


//Import personnels
var readline = require('./node-readline');
var scanner = require('./scanner');

var regfilename = "./regex.dmtt";



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




app.get('/generate/:num', function(req, res) {
	var num = req.num;
	request('https://fr.wikipedia.org/wiki/Sp%C3%A9cial:Page_au_hasard', function(error, response, body) {
		//analyse de la page au hasard reçue.

		console.log(body);
	});
	res.send('merci');
	res.end('');
});

app.listen(3000);
