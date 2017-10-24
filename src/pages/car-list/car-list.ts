import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgFor } from '@angular/common';
import { SoapService } from './soap.service';


/**
 * Generated class for the CarListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-car-list',
  providers: [SoapService], 
  templateUrl: 'car-list.html'
})
export class CarListPage {
  url:string;
  data:string;
  constructor(public navCtrl: NavController, public http: Http) {

  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad CarListPage');
    this.loadCars();
  }

  loadCars(){
    this.http.get('http://test.alimx.mx/WebService.asmx/GetModelosJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca=AUDI')
    .map(res=> res.json())
    .subscribe(data=>{
      this.data = data.ListadoDescripciones;
      console.log(data.ListadoDescripciones);
    },err =>{
      console.log(err);
    });
  }

}
