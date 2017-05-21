import { Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
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
	numero :number = -1;
	fin :boolean = false;
	i :number = 0;

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
		this.http.get('http://192.168.1.76:4000/requestQuestions?nb='+this.nombreTest+'&cat='+this.cat)
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestionnaire(res),
					err => console.error(err),
					() => console.log('done'));
	}

	resultatQuestionnaire(res :any)
	{
		console.log(res);
		this.reponse = res;
		this.numero = 0;
	}

	calcule()
	{
		console.log('exportation de données');

		this.http.post('http://192.168.1.76:4000/calculerScore', this.reponse, this.getPutHeaders())
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestionnaire(res),
					err => console.error(err),
					() => console.log('done'));
	}

	getPutHeaders()
	{
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return new RequestOptions({headers: headers, withCredentials: false});
	}

	clickedSuivant()
	{
		this.numero++;

		if(this.nombreTest <= this.numero)
		{
			this.fin = true;
			this.numero = 0;

			for(this.numero; this.numero < this.nombreTest; this.numero++)
			{
				for(this.i; this.i < this.reponse[this.numero].syntagmes.length; this.i++)
				{
					if(this.reponse[this.numero].syntagmes[this.i].reponse == null)
						this.reponse[this.numero].syntagmes[this.i].reponse = "";
				}

				this.i = 0;
			}

			this.calcule();

		}
	}
}
