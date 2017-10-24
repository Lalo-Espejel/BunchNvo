import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the GetBuscarPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-get-buscar',
  templateUrl: 'get-buscar.html',
})
export class GetBuscarPage {
  detalle:string;
  subdescripcion:string;
  descripcion:string;
  url:string;
  data:string;
  marca:string;
  anio:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.detalle=this.navParams.get('firstPassed').Detalle;
    this.url=this.navParams.get('secondPassed');
    this.marca=this.navParams.get('thirdPassed');
    this.anio=this.navParams.get('fourthPassed');
    this.descripcion= this.navParams.get('fifthPassed'); 
    this.subdescripcion=this.navParams.get('sixthPassed').SubDescripcion;
         
    this.loadDetalle(this.subdescripcion, this.url);
  }

  loadDetalle(descripcion, url){
    console.log("ES TE ES EL URL 0"+this.url+this.detalle);
    this.http.get(this.url+this.detalle)
    .map(res=> res.json())  
    .subscribe(data=>{
      this.data = data.Catalogo;
      console.log(data.Catalogo);
    },err =>{
      console.log(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetBuscarPage');
  }

}
