let cheerio = require("cheerio");
var _ = require('lodash');



exports.scan = function(resp, body) {
	console.log('URL', resp.request.uri.href);
	let $ = cheerio.load(body);
	let pIsNextSibling = true;

	let textIntro = "";
	
	let pertinent = true;
	let imagesSrc = [];
	let infobox = [];

	//console.log($('.infobox_v2, .infobox_v3').next().text());

	//--- EPURAGE ---

	// Traitement de la pertinence
	if($('.infobox_v3, .infobox_v2').length > 0 && $('#mw-content-text').has(".toc")) {  // Si il y a une infobox
		$('.infobox_v3, .infobox_v2').nextAll().each(function(i, elem) {
			if($(this).is("p") && pIsNextSibling) {
				textIntro += $(this).text();
				if(!$(this).next().is('p')) {
					pIsNextSibling = false;
				}
			}
		});

		//Stockage de l'infobox dans un tableau
		$('.infobox_v2 tr, .infobox_v3 tr').each(function(i, elem) {
			let key = $(this).children('th').text();
			let value = $(this).children('td').text();

			if(key !== '' && value !== '') {
				infobox.push({key: key, value: value});
			}
			
		});


		let numImg = 0;
		$('.infobox_v2 img, .infobox_v3 img').each(function(i, elem) {
			
			if(!_.includes($(this).attr('alt'),"documentation du modèle") 
				&& !_.includes($(this).attr('alt'),"Drapeau") 
				&& !_.includes($(this).attr('alt'),"licence libre")
				&& !_.includes($(this).attr('src'),"Defaut_2.svg")
				&& !_.includes($(this).attr('alt'),"Bandera")
				&& parseInt($(this).attr('width')) * parseInt($(this).attr('height')) > 22500) {
				numImg++;
				imagesSrc.push('http:'+$(this).attr('src'));
			}
			
			//console.log($(this).attr('alt') + ' ==> size: ' + parseInt($(this).attr('width')) * parseInt($(this).attr('height')));
		});
		//console.log(numImg);
		if(numImg < 1) {
			pertinent = false;
		}

		let numberCharacters = 0;
		$('#mw-content-text p').each(function(i, elem) {
			numberCharacters += $(this).text().length;
			//console.log($(this).text())
		});
		if(numberCharacters < 1300) {
			pertinent = false;
		}
	}
	else {
		pertinent = false;
	}
	

	if(pertinent) {
		return { titre: $('.firstHeading').text(),text: textIntro, url: resp.request.uri.href, img: imagesSrc, infobox: infobox};
	}
	else {
		return "NO";
	}
	
}