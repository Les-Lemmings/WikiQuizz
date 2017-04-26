import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'connexion',
  templateUrl: './connexion.html',
})

export class ConnexionComponent
{
	@Output() onVoted = new EventEmitter<string>();

	clickedConnexion(value: string)
	{
		this.onVoted.emit(value);
	}
}