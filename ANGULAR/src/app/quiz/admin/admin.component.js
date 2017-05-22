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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
var AdminComponent = (function () {
    //constructeur qui initialise les variables pour la communication avec le serveur
    function AdminComponent(http) {
        this.nombreQuestion = 0;
        this.http = http;
        this.reponse = [];
        this.questions = this.clickedQuestions();
    }
    /*envoie au serveur la question avec les modifications effectué si
    besoin pour l'ajou a la base de donnée*/
    AdminComponent.prototype.clickedAjout = function (value) {
        console.log(value);
        console.log('exportation de données');
        this.http.post('http://192.168.1.76:4000/validateQuestion', value, this.getPutHeaders())
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res.msg); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
        console.log("fini");
    };
    AdminComponent.prototype.getPutHeaders = function () {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return new http_1.RequestOptions({ headers: headers, withCredentials: false });
    };
    //envoie au serveur l'ID de la question à supprimer
    AdminComponent.prototype.clickedSuppression = function (value) {
        var _this = this;
        console.log(value);
        console.log('exportation de données');
        this.http.get('http://192.168.1.76:4000/removeQuestion/' + value)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.clickedQuestions(); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    //envoie au serveur une demande de renvoie des question non traité
    AdminComponent.prototype.clickedQuestions = function () {
        var _this = this;
        console.log('importation de données');
        this.http.get('http://192.168.1.76:4000/questionsOnHold')
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.resultatQuestions(res); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    //fonction qui génère autant de question que l'on a choisi
    AdminComponent.prototype.appel_serveur = function (nombre) {
        this.nombreQuestion = nombre;
        console.log('importation de données');
        this.http.get('http://192.168.1.76:4000/generate/' + this.nombreQuestion)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return console.log(res); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    //fonction qui recois les questions en attente du serveur et les stockes dans une variable
    AdminComponent.prototype.resultatQuestions = function (res) {
        this.questions = res;
        console.log(this.questions);
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    core_1.Component({
        selector: 'admin',
        templateUrl: './admin.html',
    }),
    __metadata("design:paramtypes", [http_1.Http])
], AdminComponent);
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map