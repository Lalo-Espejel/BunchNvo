webpackJsonp([2],{

/***/ 548:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BuddychatPageModule", function() { return BuddychatPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buddychat__ = __webpack_require__(562);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BuddychatPageModule = (function () {
    function BuddychatPageModule() {
    }
    return BuddychatPageModule;
}());
BuddychatPageModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */]),
        ],
        exports: [
            __WEBPACK_IMPORTED_MODULE_2__buddychat__["a" /* BuddychatPage */]
        ]
    })
], BuddychatPageModule);

//# sourceMappingURL=buddychat.module.js.map

/***/ }),

/***/ 562:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BuddychatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
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
 * Generated class for the BuddychatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var BuddychatPage = (function () {
    function BuddychatPage(navCtrl, navParams, chatservice, events, zone) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.chatservice = chatservice;
        this.events = events;
        this.zone = zone;
        this.allmessages = [];
        this.buddy = this.chatservice.buddy;
        this.photoURL = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.auth().currentUser.photoURL;
        this.scrollto();
        this.events.subscribe('newmessage', function () {
            _this.allmessages = [];
            _this.zone.run(function () {
                _this.allmessages = _this.chatservice.buddymessages;
            });
        });
    }
    BuddychatPage.prototype.addmessage = function () {
        var _this = this;
        this.chatservice.addnewmessage(this.newmessage).then(function () {
            _this.content.scrollToBottom();
            _this.newmessage = '';
        });
    };
    BuddychatPage.prototype.ionViewDidEnter = function () {
        this.chatservice.getbuddymessages();
    };
    BuddychatPage.prototype.scrollto = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    return BuddychatPage;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewChild */])('content'),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Content */])
], BuddychatPage.prototype, "content", void 0);
BuddychatPage = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPage */])(),
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_6" /* Component */])({
        selector: 'page-buddychat',template:/*ion-inline-start:"C:\Users\PC\Desktop\repos\viernes de enero\BunchNvo\src\pages\buddychat\buddychat.html"*/'<!--\n\n  Generated template for the BuddychatPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar color="hcolor">\n\n    <ion-title>{{buddy.displayName}}</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content #content>\n\n<div class = "chatwindow">\n\n  <ion-list no-lines>\n\n    <ion-item *ngFor = "let item of allmessages; let i = index" text-wrap>\n\n      <ion-avatar item-left *ngIf="item.sentby === buddy.uid">\n\n        <img src="{{buddy.photoURL}}">\n\n      </ion-avatar>\n\n      <!--<div class="bubble me" *ngIf="item.sentby === buddy.uid">\n\n        <h3>{{item.message}}</h3>\n\n      </div>-->\n\n      <div class="bubble you" *ngIf="item.sentby != buddy.uid">\n\n        <h3>{{item.message}}</h3>\n\n      </div>\n\n    </ion-item>\n\n  </ion-list>\n\n</div>\n\n</ion-content>\n\n<ion-footer ion-fixed>    \n\n  <ion-toolbar class="no-border" color="white">        \n\n    <ion-input [(ngModel)]="newmessage" placeholder="Escribe tu mensaje ..."></ion-input>  \n\n    <ion-buttons end>\n\n      <button ion-button (click)="addmessage()">\n\n        <ion-icon name="send" color="primary"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-toolbar>    \n\n</ion-footer>'/*ion-inline-end:"C:\Users\PC\Desktop\repos\viernes de enero\BunchNvo\src\pages\buddychat\buddychat.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_chat_chat__["a" /* ChatProvider */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* Events */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* NgZone */]])
], BuddychatPage);

//# sourceMappingURL=buddychat.js.map

/***/ })

});
//# sourceMappingURL=2.main.js.map