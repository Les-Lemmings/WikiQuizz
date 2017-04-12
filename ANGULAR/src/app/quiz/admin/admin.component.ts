import { Component, EventEmitter, Output} from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'admin',
  templateUrl: './admin.html',
})

export class AdminComponent
{
	@Output() onVoted = new EventEmitter<string>();

	http :Http;
	reponse :any;
	questions :any;

	constructor(http :Http)
	{
		this.http = http;
		this.reponse = [];
		this.questions = this.clickedQuestions();
	}	

	clickedID(value :string)
	{
		console.log(value);

		console.log('exportation de données');
		this.http.get('http://192.168.1.31:3000/validateQuestion/'+value)
				.map((res:Response) => res.json())
				.subscribe(res => this.clickedQuestions(),
					err => console.error(err),
					() => console.log('done'));
	}

	clickedSuppression(value :string)
	{
		console.log(value);

		console.log('exportation de données');
		this.http.get('http://192.168.1.31:3000/removeQuestion/'+value)
				.map((res:Response) => res.json())
				.subscribe(res => this.clickedQuestions(),
					err => console.error(err),
					() => console.log('done'));
	}

	clickedQuestions()
	{
			console.log('importation de données');
			this.http.get('http://192.168.1.31:3000/questionsOnHold')
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestions(res),
					err => console.error(err),
					() => console.log('done'));
	}

	appel_serveur()
	{
		console.log('importation de données');
		this.http.get('http://192.168.1.31:3000/generate/3')
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

	clickedDeconnexion(value: string)
	{
		this.onVoted.emit(value);
		console.log("bite");
	}
}