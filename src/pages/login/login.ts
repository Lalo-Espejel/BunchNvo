import { IntroductionPage } from './../introduction/introduction';
import { CarListPage } from './../car-list/car-list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecoveryPage } from '../recovery/recovery';
import { RegistrerPage } from '../registrer/registrer';
import { HomePage } from '../home/home';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
  }

  email:string;
  pass:string;

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  createAccount = () => {
    this.navCtrl.push(RegistrerPage, {animate: true});
  }

  forgotPass = () => {
    this.navCtrl.push(RecoveryPage, {animate: true});
  }

  goCarList = () => {
    this.navCtrl.push(CarListPage, {animate: true});
  }
  goIntro = () => {
    var encodedString = btoa("usuario="+this.email+"&password="+this.pass);
    console.log("el encoded para mandar"+encodedString);
    this.http.get('http://services.bunch.guru/WebService.asmx/Login?param='+encodedString)
    .map(res=> res.json())
    .subscribe(data=>{
      console.log("esta es la resputa"+data);
      if(data===true){
        this.navCtrl.push(IntroductionPage, {animate: true});
      }
    },err =>{
      console.log("el usuario no existe");
    });    
    
  }

}
