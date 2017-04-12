import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { MenuComponent } from './quiz/menu/menu.component';
import { ConnexionComponent } from './quiz/connexion/connexion.component';
import { PartieComponent } from './quiz/partie/partie.component';
import { AdminComponent } from './quiz/admin/admin.component';

import {HttpModule, JsonpModule} from '@angular/http';

@NgModule({
  imports:      [ BrowserModule, HttpModule, JsonpModule, FormsModule ],
  declarations: [ AppComponent, QuizComponent, MenuComponent, ConnexionComponent, PartieComponent, AdminComponent],
  bootstrap:    [ AppComponent]
})
export class AppModule {}
