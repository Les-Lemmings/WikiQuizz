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
var PartieComponent = (function () {
    function PartieComponent(http) {
        this.marcheTest = false;
        this.pecheTest = false;
        this.nombreTest = 0;
        this.cat = "";
        this.http = http;
        this.reponse = [];
    }
    PartieComponent.prototype.resultat = function (nombre) {
        this.nombreTest = nombre;
        console.log(nombre);
        console.log(this.marcheTest);
        console.log(this.pecheTest);
        if (this.marcheTest) {
            this.cat = "marche";
            if (this.pecheTest) {
                this.cat += ";";
                this.cat += "peche";
            }
        }
        else {
            if (this.pecheTest) {
                this.cat = "peche";
            }
        }
        console.log(this.cat);
        this.clickedQuestionnaire();
    };
    PartieComponent.prototype.clickedQuestionnaire = function () {
        var _this = this;
        console.log('exportation de données');
        this.http.get('http://192.168.1.31:4000/requestQuestions?nb=' + this.nombreTest + '&cat=' + this.cat)
            .map(function (res) { return res.json(); })
            .subscribe(function (res) { return _this.resultatQuestionnaire(res); }, function (err) { return console.error(err); }, function () { return console.log('done'); });
    };
    PartieComponent.prototype.resultatQuestionnaire = function (res) {
        console.log(res);
    };
    return PartieComponent;
}());
PartieComponent = __decorate([
    core_1.Component({
        selector: 'partie',
        templateUrl: './partie.html',
    }),
    __metadata("design:paramtypes", [http_1.Http])
], PartieComponent);
exports.PartieComponent = PartieComponent;
//# sourceMappingURL=partie.component.js.map