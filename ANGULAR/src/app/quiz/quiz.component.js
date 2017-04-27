"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var QuizComponent = (function () {
    function QuizComponent() {
        this.connecter = true;
        this.admin = true;
    }
    QuizComponent.prototype.onVoted = function (value) {
        console.log(value);
        if (value == "Jouer") {
            this.connecter = true;
        }
        if (value == "Connexion") {
            this.admin = true;
            this.connecter = true;
        }
        if (value == "Deconnexion") {
            this.admin = false;
            this.connecter = false;
        }
    };
    return QuizComponent;
}());
QuizComponent = __decorate([
    core_1.Component({
        selector: 'quiz',
        templateUrl: './quiz.html',
    })
], QuizComponent);
exports.QuizComponent = QuizComponent;
//# sourceMappingURL=quiz.component.js.map