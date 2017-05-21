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

	constructor(http :Http)
	{
		this.http = http;
		this.reponse = [];
		this.questions = this.clickedQuestions();
	}	

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

	clickedQuestions()
	{
			console.log('importation de données');
			this.http.get('http://192.168.1.76:4000/questionsOnHold')
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestions(res),
					err => console.error(err),
					() => console.log('done'));
	}

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

	resultatQuestions(res :any)
	{
		this.questions = res;
		console.log(this.questions);
	}
}