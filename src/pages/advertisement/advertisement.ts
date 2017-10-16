import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NewAdvertisementPage } from './../new-advertisement/new-advertisement';
import { AdDetailPage } from './../ad-detail/ad-detail';
import { ProductsPage } from '../products/products';

/**
 * Generated class for the AdvertisementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-advertisement',
  templateUrl: 'advertisement.html',
})
export class AdvertisementPage {

  public publishedAdvs: Array<{ id:string, img:string, paymentType: string, bank:string, accountType:string, bunch: string }>;
  public draftAdvs: Array<{ id:string, img:string, paymentType: string, bank:string, accountType:string, bunch: string }>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.publishedAdvs = [
      {id: "0", img:"assets/img/tarjeta 1.png", paymentType: localStorage.getItem("language") == "en"?"Credit card":"Tarjeta de crédito", bank: "CitBanamex", accountType: localStorage.getItem("language") == "en"?"B·smart":"B·smart", bunch: "$10.000.00"},
      {id: "0", img:"assets/img/tarjeta 2.png", paymentType: localStorage.getItem("language") == "en"?"Credit card":"Tarjeta de crédito", bank: "CitBanamex", accountType: localStorage.getItem("language") == "en"?"Master account":"Cuenta Maestra", bunch: "$10.000.00"}
    ];
    this.draftAdvs = [
      {id: "0", img:"assets/img/tarjeta 1.png", paymentType: "Tarjeta de crédito", bank: "CitBanamex", accountType: "B·smart", bunch: "$10.000.00"}
    ];
  }
  ionViewWillEnter(){
      if(localStorage.getItem("isFirstEnterToHomeScreeb") == "true") {
        this.navCtrl.push(ProductsPage, null, {animate: false});
        localStorage.setItem("isFirstEnterToHomeScreeb", "false");
      }
  }

 public detailAdv = (adv) => {
   this.navCtrl.push(AdDetailPage, null, {animate: true});
 }

 public newAdv = () => {
   this.navCtrl.push(NewAdvertisementPage, null, {animate: true});
 }

}
