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
	connecter :boolean = false;
	admin :boolean = false;

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
