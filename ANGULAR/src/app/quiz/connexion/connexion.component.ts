import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'connexion',
  templateUrl: './connexion.html',
})

export class ConnexionComponent
{
	@Output() onVoted = new EventEmitter<string>();

	/*fonction qui envoie la valeur du bouton selectionner (jouer, connexion, ...) au composant
	quizz qui se chargera ensuite d'afficher se que l'utilisateur a demandé*/
	clickedConnexion(value: string)
	{
		this.onVoted.emit(value);
	}
}