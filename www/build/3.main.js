webpackJsonp([3],{

/***/ 728:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddiesPageModule", function() { return BuddiesPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddies__ = __webpack_require__(742);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddiesPageModule = (function () {
    function BuddiesPageModule() {
    }
    return BuddiesPageModule;
}());
BuddiesPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__buddies__["a" /* BuddiesPage */]
        ]
    })
], BuddiesPageModule);

//# sourceMappingURL=buddies.module.js.map

/***/ }),

/***/ 742:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddiesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_user_user__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BuddiesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BuddiesPage = (function () {
    function BuddiesPage(navCtrl, navParams, userservice, alertCtrl, requestservice) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userservice = userservice;
        this.alertCtrl = alertCtrl;
        this.requestservice = requestservice;
        this.newrequest = {};
        this.temparr = [];
        this.filteredusers = [];
        this.userservice.getallusers().then(function (res) {
            _this.filteredusers = res;
            _this.temparr = res;
        });
    }
    BuddiesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad BuddiesPage');
    };
    BuddiesPage.prototype.searchuser = function (searchbar) {
        this.filteredusers = this.temparr;
        var q = searchbar.target.value;
        if (q.trim() == '') {
            return;
        }
        this.filteredusers = this.filteredusers.filter(function (v) {
            if (v.displayName.toLowerCase().indexOf(q.toLowerCase()) > -1) {
                return true;
            }
            return false;
        });
    };
    BuddiesPage.prototype.sendreq = function (recipient) {
        var _this = this;
        this.newrequest.sender = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.auth().currentUser.uid;
        this.newrequest.recipient = recipient.uid;
        if (this.newrequest.sender === this.newrequest.recipient)
            alert('Enviada');
        else {
            var successalert_1 = this.alertCtrl.create({
                title: 'Solicitud enviada',
                subTitle: 'Tu solicitud fue enviada' + recipient.displayName,
                buttons: ['ok']
            });
            this.requestservice.sendrequest(this.newrequest).then(function (res) {
                if (res.success) {
                    successalert_1.present();
                    var sentuser = _this.filteredusers.indexOf(recipient);
                    _this.filteredusers.splice(sentuser, 1);
                }
            }).catch(function (err) {
                alert(err);
            });
        }
    };
    return BuddiesPage;
}());
BuddiesPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-buddies',template:/*ion-inline-start:"C:\Users\PC\Desktop\repos\viernes de enero\BunchNvo\src\pages\buddies\buddies.html"*/'<ion-header>\n\n\n\n  <ion-navbar color="hcolor">\n\n    <ion-title>Amigos</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content>\n\n  <ion-searchbar [(ngModel)]="searchstring" (input)="searchuser($event)" placeholder="Search"></ion-searchbar>\n\n<ion-list no-lines>\n\n  <ion-list>\n\n    <ion-item-sliding *ngFor="let key of filteredusers">\n\n      <ion-item >\n\n        <h2>{{key.displayName}}</h2>\n\n      </ion-item>\n\n      <ion-item-options slide="left">\n\n        <button ion-button color="primary" (click)="sendreq(key)">\n\n          <ion-icon name="person-add"></ion-icon>\n\n          Agregar\n\n        </button>\n\n      </ion-item-options>\n\n      \n\n    </ion-item-sliding>\n\n  </ion-list>\n\n</ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\PC\Desktop\repos\viernes de enero\BunchNvo\src\pages\buddies\buddies.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__providers_user_user__["a" /* UserProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_requests_requests__["a" /* RequestsProvider */]])
], BuddiesPage);

//# sourceMappingURL=buddies.js.map

/***/ })

});
//# sourceMappingURL=3.main.js.map