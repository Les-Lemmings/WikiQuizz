import { Component, EventEmitter, Output } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'admin',
  templateUrl: './admin.html',
})

export class AdminComponent
{
	http :Http;
	reponse :any;
	questions :any;
	nombreQuestion :number = 0;

	//constructeur qui initialise les variables pour la communication avec le serveur
	constructor(http :Http)
	{
		this.http = http;
		this.reponse = [];
		this.questions = this.clickedQuestions();
	}	

	/*envoie au serveur la question avec les modifications effectué si 
	besoin pour l'ajou a la base de donnée*/
	clickedAjout(value :any)
	{
		console.log(value);

		console.log('exportation de données');

		this.http.post('http://192.168.1.76:4000/validateQuestion', value, this.getPutHeaders())
				.map((res:Response) => res.json())
				.subscribe(res => console.log(res.msg),
					err => console.error(err),
					() => console.log('done'));
		
		console.log("fini");
	}

	getPutHeaders()
	{
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({headers: headers, withCredentials: false});
	}

	//envoie au serveur l'ID de la question à supprimer
	clickedSuppression(value :string)
	{
		console.log(value);

		console.log('exportation de données');
		this.http.get('http://192.168.1.76:4000/removeQuestion/'+value)
				.map((res:Response) => res.json())
				.subscribe(res => this.clickedQuestions(),
					err => console.error(err),
					() => console.log('done'));
	}

	//envoie au serveur une demande de renvoie des question non traité
	clickedQuestions()
	{
			console.log('importation de données');
			this.http.get('http://192.168.1.76:4000/questionsOnHold')
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestions(res),
					err => console.error(err),
					() => console.log('done'));
	}

	//fonction qui génère autant de question que l'on a choisi
	appel_serveur(nombre :number)
	{
		this.nombreQuestion = nombre;
		console.log('importation de données');
		this.http.get('http://192.168.1.76:4000/generate/'+this.nombreQuestion)
				.map((res:Response) => res.json())
				.subscribe(res => console.log(res),
					err => console.error(err),
					() => console.log('done'));
	}

	//fonction qui recois les questions en attente du serveur et les stockes dans une variable
	resultatQuestions(res :any)
	{
		this.questions = res;
		console.log(this.questions);
	}
}