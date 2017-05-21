import { Component } from '@angular/core';

import { ConnexionComponent } from './connexion/connexion.component';
import { PartieComponent } from './partie/partie.component';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
})

export class QuizComponent
{
	//variable a true quand on clique sur jouer ou connexion
	connecter :boolean = false;

	//variable a true si on clique sur connexion
	admin :boolean = false;

	//fonction qui receptionne le clique sur jouer ou connexion depuis le composant connexion
	onVoted(value :string)
	{
		if(value == "Jouer")
		{
			this.connecter = true;
		}
		if(value == "Connexion")
		{
			this.admin = true;
			this.connecter = true;
		}
		if(value == "Deconnexion")
		{
			this.admin = false;
			this.connecter = false;
		}
	}
}
