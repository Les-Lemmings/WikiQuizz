"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var ConnexionComponent = (function () {
    function ConnexionComponent() {
        this.onVoted = new core_1.EventEmitter();
    }
    /*fonction qui envoie la valeur du bouton selectionner (jouer, connexion, ...) au composant
    quizz qui se chargera ensuite d'afficher se que l'utilisateur a demandé*/
    ConnexionComponent.prototype.clickedConnexion = function (value) {
        this.onVoted.emit(value);
    };
    return ConnexionComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ConnexionComponent.prototype, "onVoted", void 0);
ConnexionComponent = __decorate([
    core_1.Component({
        selector: 'connexion',
        templateUrl: './connexion.html',
    })
], ConnexionComponent);
exports.ConnexionComponent = ConnexionComponent;
//# sourceMappingURL=connexion.component.js.map