import { Component } from '@angular/core';
import { Http, Response, RequestOptions, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'partie',
  templateUrl: './partie.html',
})

export class PartieComponent
{
	//variable pour la connextion avec le serveur
	http :Http;
	reponse :any;

	//variable qui enregistre le type de questionnaire voulue par l'utilisateur
	marcheTest :boolean = false;
	pecheTest :boolean = false;

	//variable qui enregistre le nombre de question du questionnaire
	nombreTest :number = 0;

	/*variable qui va contenir une chaine de caractère contenant les 
	information du questionnaire voulu au serveur*/
	cat :string = "";

	/*variable qui enregistre le numéro de la question courante et qui permet 
	de chargé la question suivante*/
	numero :number = -1;

	//permet de savoir si l'on a fini le questionnaire ou non
	fin :boolean = false;
	i :number = 0;

	//constructeur qui initialise les variables de communication avec le serveur
	constructor(http :Http)
	{
		this.http = http;
		this.reponse = [];
	}

	/*fonction qui crée la chaine de caractère à envoyer au serveur sur le 
	type de questionnaire voulu par l'utilisateur*/
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

		//appel la fonction qui va envoyer la chaine au serveur
		this.clickedQuestionnaire();
	}

	//fonction qui va envoyer au serveur le questionnaire que l'on souhaite
	clickedQuestionnaire()
	{
		console.log('exportation de données');
		this.http.get('http://192.168.1.76:4000/requestQuestions?nb='+this.nombreTest+'&cat='+this.cat)
				.map((res:Response) => res.json())
				.subscribe(res => this.resultatQuestionnaire(res),
					err => console.error(err),
					() => console.log('done'));
	}

	//fonction qui recois du serveur le questionnaire attendu et l'enregistre dans une variable
	resultatQuestionnaire(res :any)
	{
		console.log(res);
		this.reponse = res;
		this.numero = 0;
	}

	/*fonction qui envoie le questionnaire fini au serveur pour le calcul du resultat et qui
	renvoie le resultat*/
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

	//fonction qui charge la question suivante du questionnaireà partir de l'objet JSON
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
