import { Component } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'partie',
  templateUrl: './partie.html',
})

export class PartieComponent
{

	http :Http;
	reponse :any;

	marcheTest :boolean = false;
	pecheTest :boolean = false;
	nombreTest :number = 0;
	cat :string = "";

	constructor(http :Http)
	{
		this.http = http;
		this.reponse = [];
	}	

	resultat(nombre :number)
	{

		this.nombreTest = nombre;

		console.log(nombre);
		console.log(this.marcheTest);
		console.log(this.pecheTest);
		if(this.marcheTest)
		{
			this.cat = "marche";

			if(this.pecheTest)
			{
				this.cat += ";";
				this.cat += "peche";
			}
		}

		else
		{
			if(this.pecheTest)
			{
				this.cat = "peche";
			}
		}

		console.log(this.cat);

		this.clickedQuestionnaire();
	}

	clickedQuestionnaire()
	{
		console.log('exportation de données');
		this.http.get('http://192.168.1.31:3000/requestQuestions?nb='+this.nombreTest+'&cat='+this.cat)
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestionnaire(res),
					err => console.error(err),
					() => console.log('done'));
	}

	resultatQuestionnaire(res :any)
	{
		console.log(res);
	}
}
