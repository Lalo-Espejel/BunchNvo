import { IntroductionPage } from './../introduction/introduction';
import { CarListPage } from './../car-list/car-list';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RecoveryPage } from '../recovery/recovery';
import { RegistrerPage } from '../registrer/registrer';
import { HomePage } from '../home/home';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

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
    this.navCtrl.push(IntroductionPage, {animate: true});
  }

}
