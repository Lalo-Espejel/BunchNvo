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
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.open('POST', 'http://core.alimx.mx/webservice.asmx', true);
     xmlhttp.setRequestHeader("Content-type", "text/xml; charset=utf-8");
     // build SOAP request
     var sr =
         '<?xml version="1.0" encoding="utf-8"?>' +
             '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">' +
               '<soapenv:Header/> '+
               '<soapenv:Body> '+  
               '<tem:CotizacionEmisionJSON> '+
               '<tem:usuario>AhorraSeguros</tem:usuario> '+
               '<tem:Password>Ah0rraS3guros2017</tem:Password>' +
               '<tem:data>{"Aseguradora":"ANA","Cliente":{"TipoPersona":null,"Nombre":null,"ApellidoPat":null,"ApellidoMat":null,"RFC":null,"FechaNacimiento":"19/11/1988","Ocupacion":null,"CURP":null,"Direccion":{"Calle":null,"NoExt":null,"NoInt":null,"Colonia":null,"CodPostal":"04100","Poblacion":null,"Ciudad":null,"Pais":null},"Edad":28,"Genero":"Masculino","Telefono":null,"Email":null},"Vehiculo":{"Uso":"PARTICULAR","Marca":"AUDI","Modelo":"2016","NoMotor":"","NoSerie":"","NoPlacas":"","Descripcion":"A3 AMBIENTE 3PTAS. AUT. | S-TRONIC 1.4L","CodMarca":"","CodDescripcion":"","CodUso":"","Clave":"G0060336","Servicio":"PARTICULAR"},"Coberturas":[],"Paquete":"AMPLIA","Descuento":null,"PeriodicidadDePago":0,"Cotizacion":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"CotID":null,"VerID":null,"CotIncID":null,"VerIncID":null,"Resultado":null},"Emision":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"Terminal":null,"Documento":null,"Poliza":null,"Resultado":null},"Pago":{"MedioPago":null,"NombreTarjeta":null,"Banco":null,"NoTarjeta":null,"MesExp":null,"AnioExp":null,"CodigoSeguridad":null,"NoClabe":null,"Carrier":0},"CodigoError":null,"urlRedireccion":null}</tem:data>'+
               '<tem:movimiento>cotizacion</tem:movimiento>'+
               '</tem:CotizacionEmisionJSON> '+
               '</soapenv:Body> '+
           '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 200) {
                var aseguradora="";
                console.log(this.responseText);
                var Data = JSON.parse(this.responseText);
                console.log(Data);

            }
        }
    }
     // Send the POST request
     xmlhttp.setRequestHeader('Content-Type', 'text/xml');
     xmlhttp.send(sr);
     // send request
     // ...
 }

}



