//REQUIRE
var NlpjsTFr = require('nlp-js-tools-french');
var Ngram = require('node-ngram');

var pos = require('pos');
const util = require('util');

var j=0;
var text = "Jorge Lavelli est un metteur en scène de théâtre et d'opéra argentin né à Buenos Aires en 1932. Venu en France en 1960 comme boursier du fonds national des arts de son pays pour suivre les cours de l'école Charles Dullin et de l'école Jacques Lecoq, il y a fait presque toute sa carrière. Il a été naturalisé français en 1977.";


var ngram = new Ngram({n: 3});
var config = {
    tagTypes: ['art', 'ver', 'nom', 'adj', 'adv', 'pro', 'pre', 'ono', 'con'],
    strictness: true,
    minimumLength: 1,
    debug: true
};
var nlpToolsFr = new NlpjsTFr(text, config);
var posTaggedWords = nlpToolsFr.posTagger();
var tagsLeft = ['UNK' , 'PRO:ind' , 'VER' , 'PRE' ,'ART:def' ,'CON', 'ADJ:num']


for (i in posTaggedWords) {
    var taggedWord = posTaggedWords[i];
    var word = taggedWord.word;
    var tags = taggedWord.pos;
    var tag = taggedWord.pos[0];
    var ngramI = ngram.ngram(text)[i]
    //console.log("TAG: ");
    console.log("Word: "+util.inspect(word, false, null)+" / "+util.inspect(tag, false, null))
    console.log("Ngram: "+ngramI[0]+"\n")
    //Si j est index des n gram ET le 1er mot du ngram = au mot taggé ET le tag n'est pas 
	//if(j<ngram.ngram(text).length & ngram.ngram(text)[j][0].toLowerCase() == word.toLowerCase() ){
		if(ngramI[0] == word  & tag !='UNK' & tag != 'VER' & tag !='PRO:ind' & tag !='PRE' & tag !='ART:def' & tag !='CON' & tag != 'ADJ:num'){
			console.log(ngramI);
			var metier = ngramI[0]; 
			var metier = metier +" "+ngramI[1];
			var metier =metier +" "+ngramI[2];
			console.log("metier: "+metier);
			break;}
	//}
}

//console.log(posTaggedWords);
/*
var words = new pos.Lexer().lex(text);
var tagger = new pos.Tagger();
var taggedWords = tagger.tag(words);

for (i in taggedWords) {
    var taggedWord = taggedWords[i];
    var word = taggedWord[0];
    var tag = taggedWord[1];
    console.log("TAG: "+word + " /" + tag);
    

     
    //Si j est index des n gram ET le 1er mot du ngram = au mot taggé ET le tag n'est pas 
	if(j<ngram.ngram(text).length & ngram.ngram(text)[j][0].toLowerCase() == word.toLowerCase() & tag != 'FW')
		console.log("NGRAM: "+ngram.ngram(text)[j]);
			break;
	}
}*/
//console.log(ngram.ngram(text));
