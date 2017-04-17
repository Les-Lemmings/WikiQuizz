import { Component } from '@angular/core';

import { MenuComponent } from './menu/menu.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { PartieComponent } from './partie/partie.component';
import { AdminComponent } from './admin/admin.component';

@Component({
  selector: 'quiz',
  templateUrl: './quiz.html',
})

export class QuizComponent
{
	connecter :boolean = true;
	admin :boolean = true;

	onVoted(value :string)
	{
		console.log(value);
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
