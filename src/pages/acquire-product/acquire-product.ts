import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import {PaymentSubmittedPage} from "../payment-submited/payment-submited";
import { DocumentDetailPage } from '../acquire-product/document-details/document-detail';
import { PayPolicyPage } from '../acquire-product/pay-policy/pay-policy';
import { ProductsPage } from '../products/products';
import { ClienteProductDetailPage } from '../client-mode/cliente-product-detail/cliente-product-detail';
import { AlertService } from '../../_helpers/alert.service'
import { LocalizationModel } from '../../_helpers/localizationModel'


import { IonicPage, Events } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AdvertisementPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'acquire-product-page',
    templateUrl: 'acquire-product.html',
})
export class AcquireProductPage {
    color = 'pink';
    size = 16;
    url:string;
    data:string;
    Marca:string;
    CP2:string;
    Modelo:string;
    Gender:string;
    Descripcion:string;
    SubDescripcion:string;
    Detalle:string;
    Edad:string;
    public userBrandList =  [];
    isEnabled:boolean;
    isEnabledTipo3:boolean;
    isEnabledTipo3Dir:boolean;

    aseguradoraCot:string;
    edadCot:string;
    emailCot:string;
    nombreCot:string;
    apellidoPCot:string;
    apellidoMCot:string;
    generoCot:string;
    movilCot:string;
    rfcCot:string;
    noDePlacasCot:string;
    noDeSerieCot:string;
    noDeMotorCot:string;
    lugarDeNacimientoCot:string;
    cpCot:string;
    calleCot:string;
    noExtCot:string;
    noIntCot:string;
    coloniaCot:string;
    delegacionCot:string;
    estadoCot:string;
    telefonoCasaCot:string;
    claveCot:string;
    noTarjetaCot:string;
    titularCot:string;
    bancoCot:string;
    tipoCot:string;  
    cvvCot:string;  
    mesCot:string;
    anioCot:string;
    carrierCot:string;
    idCliCot:string;
    idDirCot:string;
    idContCot:string;





    master(){
        console.log("master");
        document.getElementById("master").style.opacity = "1";
        document.getElementById("visa").style.opacity = ".5";
        document.getElementById("amex").style.opacity = ".5";
    }
    amex(){
        console.log("amex");
        document.getElementById("master").style.opacity = ".5";
        document.getElementById("visa").style.opacity = ".5";
        document.getElementById("amex").style.opacity = "1";
    }
    visa(){
        console.log("visa");
        document.getElementById("master").style.opacity = ".5";
        document.getElementById("visa").style.opacity = "1";
        document.getElementById("amex").style.opacity = ".5";
    }
    ionViewDidLoad(){
        this.isEnabled=true;
        var str="";
        var cont=0;
        this.http.get('http://test.alimx.mx/WebService.asmx/GetMarcasJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017')
        .map(res=> res.json())
        .subscribe(data=>{
            this.data = data.ListadoMarcas;
            for (let key of this.data ) {
                console.log ('key: ' +  JSON.stringify(key) + ',  value: ' + JSON.stringify(data.ListadoMarcas[cont].Marca));
                this.userBrandList.push(JSON.stringify(data.ListadoMarcas[cont].Marca).replace(/"/g,''));
                cont++;
                console.log(this.userBrandList);
            }
            /*for (let item of this.data){
                console.log(data.keys(response));
                this.userBrandList.push(JSON.stringify(item));
                console.log("RES "+ this.userBrandList);
            }/**/
        },err =>{
            console.log(err);
        });     
    }   
    showAlertMarca( value, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setTitle(massage);
        alert.setCssClass('definidaX');
    
        for (let Marca of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Marca,
                 value: Marca
            });
         }
    
        alert.addButton('Cancelar');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Marca").innerHTML=testRadioResult;
            document.getElementById("marcaU").innerHTML=testRadioResult;
            this.userModelList = [];
            this.Marca=testRadioResult;
            this.getModelo();
        }
        });
        alert.present();

    }
    getModelo(){
        var url2="";
        var cont=0;
        url2=('http://test.alimx.mx/WebService.asmx/GetModelosJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.Marca+'');
        this.http.get(url2)
        .map(res=> res.json())  
        .subscribe(data=>{
          this.data = data.ListadoDescripciones;
          for (let key of this.data ) {
            console.log ('key: ' +  JSON.stringify(key) + ',  value: ' + JSON.stringify(data.ListadoDescripciones[cont].Modelo));
            this.userModelList.push(JSON.stringify(data.ListadoDescripciones[cont].Modelo).replace(/"/g,''));
            cont++;
            console.log(this.userModelList);
        }
        },err =>{
          console.log(err);
        });        
    }
    showAlertColony( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3Dir==true){
            //this.alertSrv.showAlert(value, mode, modelList, massage);
            var testRadioResult;
            var testRadioOpen=false;
            let alert = this.alertCtrl.create();
            alert.setTitle(massage);
            alert.setCssClass('definidaX');
        
            for (let item of modelList) {
                alert.addInput({
                    type: 'radio',
                    label: item,
                    value: item
                });
            }
        
            alert.addButton('Cancelar');
            alert.addButton({
            text: 'OK',
            handler: data => {
                testRadioOpen = false;
                testRadioResult = data;
                console.log("se ha cicleado el valor de la colonia: "+testRadioResult);
                document.getElementById("colonia").innerHTML=testRadioResult;
                this.coloniaCot=testRadioResult;
            }
            });
            alert.present();
        }

    }    
    showAlertModelo( value, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setTitle(massage);
        alert.setCssClass('definidaX');
    
        for (let Modelo of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Modelo,
                 value: Modelo
            });
         }
    
        alert.addButton('Cancelar');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Modelo").innerHTML=testRadioResult;
            document.getElementById("modeloU").innerHTML=testRadioResult;
            this.Modelo=testRadioResult;
            this.userDescriptionList = [];
            this.getDescripcion();
        }
        });
        alert.present();
    }
    getDescripcion(){
        var url2="";
        var cont=0;
        url2=('http://test.alimx.mx/WebService.asmx/GetDescripcionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.Marca+'&modelo='+this.Modelo);
        this.http.get(url2)
        .map(res=> res.json())  
        .subscribe(data=>{
          this.data = data.ListadoDescripciones;
          for (let key of this.data ) {
            console.log ('key: ' +  JSON.stringify(key) + ',  value: ' + JSON.stringify(data.ListadoDescripciones[cont].Descripcion));
            this.userDescriptionList.push(JSON.stringify(data.ListadoDescripciones[cont].Descripcion).replace(/"/g,''));
            cont++;
            console.log(this.userDescriptionList);
        }
        },err =>{
          console.log(err);
        });        
    }
    showAlertDescripcion( value, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setTitle(massage);
        alert.setCssClass('definidaX');
        for (let Descripcion of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Descripcion,
                 value: Descripcion
            });
         }
    
        alert.addButton('Cancelar');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Descripcion").innerHTML=testRadioResult;
            document.getElementById("submarcaU").innerHTML=testRadioResult;
            this.Descripcion=testRadioResult;
            this.getSubDescripcion();
        }
        });
        alert.present();
    }    
    getSubDescripcion(){
        var url2="";
        var cont=0;
        url2=('http://test.alimx.mx/WebService.asmx/GetSubDescripcionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.Marca+'&modelo='+this.Modelo+'&descripcion='+this.Descripcion);
        this.http.get(url2)
        .map(res=> res.json())  
        .subscribe(data=>{
          this.data = data.ListadoSubDescripciones;
          for (let key of this.data ) {
            console.log ('key: ' +  JSON.stringify(key) + ',  value: ' + JSON.stringify(data.ListadoSubDescripciones[cont].SubDescripcion));
            this.userSubDescriptionList.push(JSON.stringify(data.ListadoSubDescripciones[cont].SubDescripcion).replace(/"/g,''));
            cont++;
            console.log(this.userSubDescriptionList);
        }
        },err =>{
          console.log(err);
        });        
    }
    showAlertSubDescripcion( value, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setTitle(massage);
        alert.setCssClass('definidaX');
    
        for (let SubDescripcion of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: SubDescripcion,
                 value: SubDescripcion
            });
         }
    
        alert.addButton('Cancelar');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("SubDescripcion").innerHTML=testRadioResult;
            document.getElementById("descripcionU").innerHTML=testRadioResult;
            this.SubDescripcion=testRadioResult;
            this.getDetalle();
        }
        });
        alert.present();
    }   
    getDetalle(){
        var url2="";
        var cont=0;
        url2=('http://test.alimx.mx/WebService.asmx/GetDetalleJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.Marca+'&modelo='+this.Modelo+'&descripcion='+this.Descripcion+'&subdescripcion='+this.SubDescripcion);
        this.http.get(url2)
        .map(res=> res.json())  
        .subscribe(data=>{
          this.data = data.ListadoDetalles;
          for (let key of this.data ) {
            console.log ('key: ' +  JSON.stringify(key) + ',  value: ' + JSON.stringify(data.ListadoDetalles[cont].Detalle));
            this.userDetalleList.push(JSON.stringify(data.ListadoDetalles[cont].Detalle).replace(/"/g,''));
            cont++;
            console.log(this.userDetalleList);
        }
        },err =>{
          console.log(err);
        });        
    }  
    showAlertDetalle( value, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setTitle(massage);
        alert.setCssClass('definida');
        alert.setCssClass('definidaX');
    
        for (let Detalle of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Detalle,
                 value: Detalle
            });
         }
    
        alert.addButton('Cancelar');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Detalle").innerHTML=testRadioResult;
            this.Detalle=testRadioResult;
            this.getBuscar();
        }
        });
        alert.present();
    }             
    getBuscar(){
        var url2="";
        var cont=0;
        var aseguradora="";
        var clave="";
        var descripcionAseguradora="";
        url2=('http://test.alimx.mx/WebService.asmx/BuscarJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&marca='+this.Marca+'&modelo='+this.Modelo+'&descripcion='+this.Descripcion+'&subdescripcion='+this.SubDescripcion+'&detalle='+this.Detalle);
        console.log("ESTO ESTA MANDANDO: "+url2);
        this.http.get(url2)
        .map(res=> res.json())  
        .subscribe(data=>{
          this.data = data.Catalogo;
          for(let key of this.data){
            aseguradora=JSON.stringify(data.Catalogo[cont].Aseguradora);
            clave=JSON.stringify(data.Catalogo[cont].CatDescripciones[0].clave);
            descripcionAseguradora=JSON.stringify(data.Catalogo[cont].CatDescripciones[0].Descripcion);
            cont++;
            console.log("con el contador "+cont+" tenemos la aseguradora: "+aseguradora+" con la clave: "+clave+" con la descripcion: "+descripcionAseguradora);
            this.loadCotizacion(aseguradora, clave, descripcionAseguradora);
          }
        },err =>{
          console.log(err);
        });        
    }  

    loadCotizacion(aseguradora, clave, descripcionAseguradora){
        
        var str="";
        var str2="";
        var strJ="";  
        var conta=0;
        var data2="";
        var data3="";
        var data4="";
        var data5="";
        var data6="";
        var data7="";
        var data8="";

        var displayPrimaTotal="";
        var displayPrimaTotalInt=0;

        var displayDanosMateriales="";
        var displayRoboTotal="";
        var displayRCPersonas="";
        var displayRC="";
        var displayDefensaJuridica="";
        var displayGastosMedicosOcupantes="";

        //Variables para los deducibles
        var displayDanosMaterialesD="";
        var displayRoboTotalD="";
        var displayRCPersonasD="";
        var displayRCD="";
        var displayDefensaJuridicaD="";
        var displayGastosMedicosOcupantesD="";       
        var fecha = new Date();
        var ano = fecha.getFullYear();
        var anioFechaNac= ano-parseInt(this.Edad);
        var cpCot=document.getElementById('CP2').outerText
        console.log(document.getElementById('CP2').outerText);
        console.log(cpCot +" "+ anioFechaNac )
        var myJSON='{"Aseguradora":'+aseguradora+',"Cliente":{"TipoPersona":null,"Nombre":null,"ApellidoPat":null,"ApellidoMat":null,"RFC":null,"FechaNacimiento":"01/01/'+anioFechaNac+'","Ocupacion":null,"CURP":null,"Direccion":{"Calle":null,"NoExt":null,"NoInt":null,"Colonia":null,"CodPostal":"'+cpCot+ '","Poblacion":null,"Ciudad":null,"Pais":null},"Edad":'+this.Edad+',"Genero":"Masculino","Telefono":null,"Email":null},"Vehiculo":{"Uso":"PARTICULAR","Marca":"'+this.Marca+'","Modelo":"'+this.Modelo+'","NoMotor":"","NoSerie":"","NoPlacas":"","Descripcion":'+descripcionAseguradora+',"CodMarca":"","CodDescripcion":"","CodUso":"","Clave":'+clave+',"Servicio":"PARTICULAR"},"Coberturas":[],"Paquete":"AMPLIA","Descuento":null,"PeriodicidadDePago":0,"Cotizacion":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"CotID":null,"VerID":null,"CotIncID":null,"VerIncID":null,"Resultado":null},"Emision":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"Terminal":null,"Documento":null,"Poliza":null,"Resultado":null},"Pago":{"MedioPago":null,"NombreTarjeta":null,"Banco":null,"NoTarjeta":null,"MesExp":null,"AnioExp":null,"CodigoSeguridad":null,"NoClabe":null,"Carrier":0},"CodigoError":null,"urlRedireccion":null}';
          console.log('este sera el url a consultar '+'http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion');
          this.http.get('http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion')
          .map(res2=> res2.json() )  
          .subscribe(data2=>{
            data3 = data2.Coberturas[0].DanosMateriales;
            data4 = data2.Coberturas[0].RoboTotal;
            data5 = data2.Coberturas[0].RCPersonas;
            data6 = data2.Coberturas[0].RC;
            data7 = data2.Coberturas[0].DefensaJuridica;
            data8 = data2.Coberturas[0].GastosMedicosOcupantes;

            displayDanosMateriales=(JSON.stringify(data3)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
            displayRoboTotal=(JSON.stringify(data4)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
            displayRCPersonas=(JSON.stringify(data5)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
            displayRC=(JSON.stringify(data6)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
            displayDefensaJuridica=(JSON.stringify(data7)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
            displayGastosMedicosOcupantes=(JSON.stringify(data8)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');

            //seccion para la recepcion de la primaTotal y su conversion a int
            data2 = data2.Cotizacion.PrimaTotal;
            str = JSON.stringify(data2);
            displayPrimaTotal = str.replace(/"|,|\$/g,'');
            displayPrimaTotalInt=Math.ceil(parseInt(displayPrimaTotal));
            displayPrimaTotal=displayPrimaTotalInt.toLocaleString();
            displayPrimaTotal='$'+displayPrimaTotal;

            //para los daños materiales
            displayDanosMaterialesD=displayDanosMateriales.split('-D')[1];
            displayDanosMateriales=parseInt(displayDanosMateriales.split('-D')[0]).toLocaleString();
            displayDanosMateriales='$'+displayDanosMateriales;
            if(displayDanosMateriales==='$NaN'){
                displayDanosMateriales='-';
            }

            //para el robo total
            displayRoboTotalD=displayRoboTotal.split('-D')[1];
            displayRoboTotal=parseInt(displayRoboTotal.split('-D')[0]).toLocaleString();
            displayRoboTotal='$'+displayRoboTotal;
            if(displayRoboTotal==='$NaN'){
                displayRoboTotal='-';
            }

            //Def juridica
            //displayDefensaJuridicaD=displayDefensaJuridica.split('-D')[1];
            displayDefensaJuridica=parseInt(displayDefensaJuridica.split('-D')[0]).toLocaleString();
            displayDefensaJuridica='$'+displayDefensaJuridica; 
            if(displayDefensaJuridica==='$NaN'){
                displayDefensaJuridica='-';
            } 
            
            //Gastos medicos ocupantes
            displayGastosMedicosOcupantesD=displayGastosMedicosOcupantes.split('-D')[0];
            if(displayGastosMedicosOcupantesD==='  Amparada')
                displayGastosMedicosOcupantes='Amparada';
            else{
                displayGastosMedicosOcupantes=parseInt(displayGastosMedicosOcupantes.split('-D')[0]).toLocaleString();
                displayGastosMedicosOcupantes='$'+displayGastosMedicosOcupantes;             
            }
            if(displayGastosMedicosOcupantes==='$NaN'){
                displayGastosMedicosOcupantes='-';
            }

            //RC Personas         
            if(displayRCPersonasD==='  Amparada -')
                displayRCPersonasD='Amparada';
            else   
                displayRCPersonasD='$'+displayRCPersonasD;
            if(displayRCPersonasD==='$')
                displayRCPersonasD='-';

            //RC


/*
            //RC Personas
            displayRCPersonasD=displayRCPersonas.split('-D')[1];
            displayRCPersonas=parseInt(displayRCPersonas.split('-D')[0]).toLocaleString();
            displayRCPersonas='$'+displayRCPersonas;

            //RC
            displayRCD=displayRC.split('-D')[1];
            displayRC=parseInt(displayRC.split('-D')[0]).toLocaleString();
            displayRC='$'+displayRC;
            

*/
            console.log("la aseguradora: "+aseguradora+ "el valor del int es "+displayPrimaTotal+" DANOS MATERIALES: "+displayDanosMateriales);

            aseguradora=aseguradora.replace(/"/g,'');
            document.getElementById("nombreAuto").innerHTML=this.Marca+' '+this.Modelo;
            document.getElementById("descrAuto").innerHTML=this.Descripcion;
            document.getElementById("subDescrAuto").innerHTML=this.SubDescripcion; 
            if(aseguradora==='ABA' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({  
                    clave: clave,
                    asegur: aseguradora,  
                    img: "assets/icon/logo/asegurdoras-aba.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD

                });
            }
            if(aseguradora==='ANA'){
                var primaAna='';
                var enStr='';
                //console.log('se buscará ANA YOFO'+'http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion');
                //this.http.get('http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion')
                console.log("el atob antes"+':'+'usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion');
                console.log("el atob es"+enStr);
                //checkpoint
                this.storage.get('name').then((val) => {
                var locale=val;
                enStr=btoa('usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion&idContVend='+locale);
                console.log("enStr completa sería http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?param="+enStr)
                this.http.get('http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?param='+enStr)
                .map(res3=> res3.json())  
                .subscribe(data3=>{
                  console.log('debugg'+JSON.stringify(data3));

                  //para la primatotal
                  primaAna= data3.Cotizacion.PrimaTotal;
                  displayPrimaTotal = primaAna.replace(/"|,|\$/g,'');
                  displayPrimaTotalInt=Math.ceil(parseInt(displayPrimaTotal));
                  displayPrimaTotal=displayPrimaTotalInt.toLocaleString();
                  displayPrimaTotal='$'+displayPrimaTotal;

                  displayDanosMateriales=(JSON.stringify(data3.Coberturas[0].DanosMateriales)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
                  displayRoboTotal=(JSON.stringify(data3.Coberturas[0].RoboTotal)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
                  displayRCPersonas=(JSON.stringify(data3.Coberturas[0].RCPersonas)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
                  displayRC=(JSON.stringify(data3.Coberturas[0].RC)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
                  displayDefensaJuridica=(JSON.stringify(data3.Coberturas[0].DefensaJuridica)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
                  displayGastosMedicosOcupantes=(JSON.stringify(data3.Coberturas[0].GastosMedicosOcupantes)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');

                  displayDanosMaterialesD=displayDanosMateriales.split('-D')[1];
                  displayDanosMateriales=parseInt(displayDanosMateriales.split('-D')[0]).toLocaleString();
                  displayDanosMateriales='$'+displayDanosMateriales;
                  if(displayDanosMateriales==='$NaN'){
                      displayDanosMateriales='-';
                  }

                    //para el robo total
                    displayRoboTotalD=displayRoboTotal.split('-D')[1];
                    displayRoboTotal=parseInt(displayRoboTotal.split('-D')[0]).toLocaleString();
                    displayRoboTotal='$'+displayRoboTotal;
                    if(displayRoboTotal==='$NaN'){
                        displayRoboTotal='-';
                    }                  

                  this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-ana.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD             
                });                   
                  //data10 = data3.Coberturas[0].DanosMateriales;
                  /*data4 = data3.Coberturas[0].RoboTotal;
                  data5 = data3.Coberturas[0].RCPersonas;
                  data6 = data3.Coberturas[0].RC;
                  data7 = data3.Coberturas[0].DefensaJuridica;
                  data8 = data3.Coberturas[0].GastosMedicosOcupantes;
                  data9 =/**/
      
                  //displayDanosMateriales=(JSON.stringify(data10)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
                  /*displayRoboTotal=(JSON.stringify(data4)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
                  displayRCPersonas=(JSON.stringify(data5)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
                  displayRC=(JSON.stringify(data6)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
                  displayDefensaJuridica=(JSON.stringify(data7)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
                  displayGastosMedicosOcupantes=(JSON.stringify(data8)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');
                  data9=(JSON.stringify(data9));*/

                });
            }); 
            }
            if(aseguradora==='AXA' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-axa.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD                  
                });
            }  
            if(aseguradora==='BANORTE' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({  
                    clave: clave,
                    asegur: aseguradora,     
                    img: "assets/icon/logo/asegurdoras-banorte.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD                  
                });
            }  
            if(aseguradora==='GMX' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-gmx.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD
                });
            }                 
            if(aseguradora==='GNP'){
                var primaGNP='';
                var enStr='';                
                console.log("el atob antes"+':'+'usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion');
                console.log("el atob es"+enStr);
                //checkpoint
                this.storage.get('name').then((val) => {
                var locale=val;
                enStr=btoa('usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion&idContVend='+locale);
                console.log("enStr completa sería http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?param="+enStr)
                this.http.get('http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?param='+enStr)
                .map(res3=> res3.json())  
                .subscribe(data3=>{
                  console.log('debugg'+JSON.stringify(data3));

                  //para la primatotal
                  primaGNP= data3.Cotizacion.PrimaTotal;
                  displayPrimaTotal = primaGNP.replace(/"|,|\$/g,'');
                  displayPrimaTotalInt=Math.ceil(parseInt(displayPrimaTotal));
                  displayPrimaTotal=displayPrimaTotalInt.toLocaleString();
                  displayPrimaTotal='$'+displayPrimaTotal;

                  displayDanosMateriales=(JSON.stringify(data3.Coberturas[0].DanosMateriales)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
                  displayRoboTotal=(JSON.stringify(data3.Coberturas[0].RoboTotal)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
                  displayRCPersonas=(JSON.stringify(data3.Coberturas[0].RCPersonas)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
                  displayRC=(JSON.stringify(data3.Coberturas[0].RC)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
                  displayDefensaJuridica=(JSON.stringify(data3.Coberturas[0].DefensaJuridica)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
                  displayGastosMedicosOcupantes=(JSON.stringify(data3.Coberturas[0].GastosMedicosOcupantes)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');

                  displayDanosMaterialesD=displayDanosMateriales.split('-D')[1];
                  displayDanosMateriales=parseInt(displayDanosMateriales.split('-D')[0]).toLocaleString();
                  displayDanosMateriales='$'+displayDanosMateriales;
                  if(displayDanosMateriales==='$NaN'){
                      displayDanosMateriales='-';
                  }

                    //para el robo total
                    displayRoboTotalD=displayRoboTotal.split('-D')[1];
                    displayRoboTotal=parseInt(displayRoboTotal.split('-D')[0]).toLocaleString();
                    displayRoboTotal='$'+displayRoboTotal;
                    if(displayRoboTotal==='$NaN'){
                        displayRoboTotal='-';
                    }                  

                  this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-gnp.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD             
                });                   
                  //data10 = data3.Coberturas[0].DanosMateriales;
                  /*data4 = data3.Coberturas[0].RoboTotal;
                  data5 = data3.Coberturas[0].RCPersonas;
                  data6 = data3.Coberturas[0].RC;
                  data7 = data3.Coberturas[0].DefensaJuridica;
                  data8 = data3.Coberturas[0].GastosMedicosOcupantes;
                  data9 =/**/
      
                  //displayDanosMateriales=(JSON.stringify(data10)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
                  /*displayRoboTotal=(JSON.stringify(data4)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
                  displayRCPersonas=(JSON.stringify(data5)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
                  displayRC=(JSON.stringify(data6)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
                  displayDefensaJuridica=(JSON.stringify(data7)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
                  displayGastosMedicosOcupantes=(JSON.stringify(data8)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');
                  data9=(JSON.stringify(data9));*/

                });
            });  
                
                // this.comparaList.push({ 
                //     clave: clave,
                //     asegur: aseguradora,      
                //     img: "assets/icon/logo/asegurdoras-gnp.svg",
                //     value: displayPrimaTotal,
                //     danosMateriales: displayDanosMateriales,
                //     danosMaterialesD: displayDanosMaterialesD,
                //     roboTotal: displayRoboTotal,
                //     roboTotalD: displayRoboTotalD,
                //     RCPersonas: displayRCPersonas,
                //     RCPersonasD: displayRCPersonasD,
                //     RC:displayRC,
                //     RCD:displayRCD,
                //     DefensaJuridica:displayDefensaJuridica,
                //     DefensaJuridicaD:displayDefensaJuridicaD,
                //     GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                //     GastosMedicosOcupantesD: displayGastosMedicosOcupantesD
                // });
            }
            if(aseguradora==='GREAT' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-great.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD
                });
            }                 
            if(aseguradora==='HDI'){
                var primaHDI='';
                var enStr='';                
                console.log("el atob antes"+':'+'usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion');
                console.log("el atob es"+enStr);
                //checkpoint
                this.storage.get('name').then((val) => {
                var locale=val;
                enStr=btoa('usuario=Bunch&Password=BunCH2O18&data='+myJSON+'&movimiento=cotizacion&idContVend='+locale);
                console.log("enStr completa sería http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?param="+enStr);
                this.http.get('http://services.bunch.guru/WebService.asmx/CotizacionEmisionJSON?param='+enStr)
                .timeout(500000)
                .map(res3=> res3.json())  
                .subscribe(data3=>{
                  console.log('debugg'+JSON.stringify(data3));

                  //para la primatotal
                  primaHDI= data3.Cotizacion.PrimaTotal;
                  displayPrimaTotal = primaHDI.replace(/"|,|\$/g,'');
                  displayPrimaTotalInt=Math.ceil(parseInt(displayPrimaTotal));
                  displayPrimaTotal=displayPrimaTotalInt.toLocaleString();
                  displayPrimaTotal='$'+displayPrimaTotal;

                  displayDanosMateriales=(JSON.stringify(data3.Coberturas[0].DanosMateriales)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
                  displayRoboTotal=(JSON.stringify(data3.Coberturas[0].RoboTotal)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
                  displayRCPersonas=(JSON.stringify(data3.Coberturas[0].RCPersonas)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
                  displayRC=(JSON.stringify(data3.Coberturas[0].RC)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
                  displayDefensaJuridica=(JSON.stringify(data3.Coberturas[0].DefensaJuridica)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
                  displayGastosMedicosOcupantes=(JSON.stringify(data3.Coberturas[0].GastosMedicosOcupantes)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');

                  displayDanosMaterialesD=displayDanosMateriales.split('-D')[1];
                  displayDanosMateriales=parseInt(displayDanosMateriales.split('-D')[0]).toLocaleString();
                  displayDanosMateriales='$'+displayDanosMateriales;
                  if(displayDanosMateriales==='$NaN'){
                      displayDanosMateriales='-';
                  }

                    //para el robo total
                    displayRoboTotalD=displayRoboTotal.split('-D')[1];
                    displayRoboTotal=parseInt(displayRoboTotal.split('-D')[0]).toLocaleString();
                    displayRoboTotal='$'+displayRoboTotal;
                    if(displayRoboTotal==='$NaN'){
                        displayRoboTotal='-';
                    }                  

                  this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-hdi.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD             
                });                   
                  //data10 = data3.Coberturas[0].DanosMateriales;
                  /*data4 = data3.Coberturas[0].RoboTotal;
                  data5 = data3.Coberturas[0].RCPersonas;
                  data6 = data3.Coberturas[0].RC;
                  data7 = data3.Coberturas[0].DefensaJuridica;
                  data8 = data3.Coberturas[0].GastosMedicosOcupantes;
                  data9 =/**/
      
                  //displayDanosMateriales=(JSON.stringify(data10)).replace(/"|-N|-S|DAÑOS|MATERIALES/g,'');
                  /*displayRoboTotal=(JSON.stringify(data4)).replace(/"|-N|-S|ROBO|TOTAL/g,'');
                  displayRCPersonas=(JSON.stringify(data5)).replace(/"|-N|-S|NRC|PERSONAS|RESPONSABILIDAD|CIVIL|PERSONAS|NO|APLICA|RC|-|D|-/g,'');
                  displayRC=(JSON.stringify(data6)).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL|NO|APLICA|No|aplica/g,'');
                  displayDefensaJuridica=(JSON.stringify(data7)).replace(/"|-N|-S|-D|GASTOS|ES|ASISTENCIA|LEGAL|PROVIAL|LEGALES/g,'');
                  displayGastosMedicosOcupantes=(JSON.stringify(data8)).replace(/"|-N|-S|-D|GASTOS|MÉDICOS|OCUPANTES/g,'');
                  data9=(JSON.stringify(data9));*/

                });
            }); 
                
                // this.comparaList.push({ 
                //     clave: clave,
                //     asegur: aseguradora,      
                //     img: "assets/icon/logo/asegurdoras-hdi.svg",
                //     value: displayPrimaTotal,
                //     danosMateriales: displayDanosMateriales,
                //     danosMaterialesD: displayDanosMaterialesD,
                //     roboTotal: displayRoboTotal,
                //     roboTotalD: displayRoboTotalD,
                //     RCPersonas: displayRCPersonas,
                //     RCPersonasD: displayRCPersonasD,
                //     RC:displayRC,
                //     RCD:displayRCD,
                //     DefensaJuridica:displayDefensaJuridica,
                //     DefensaJuridicaD:displayDefensaJuridicaD,
                //     GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                //     GastosMedicosOcupantesD: displayGastosMedicosOcupantesD
                // });
            }  
            if(aseguradora==='MAPFRE' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
                    clave: clave,
                    asegur: aseguradora,      
                    img: "assets/icon/logo/asegurdoras-mapfre.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD
                });
            }              
            if(aseguradora==='QUALITAS' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({  
                    clave: clave,
                    asegur: aseguradora,     
                    img: "assets/icon/logo/asegurdoras-qualitas.svg",
                    value: displayPrimaTotal,
                    danosMateriales: displayDanosMateriales,
                    danosMaterialesD: displayDanosMaterialesD,
                    roboTotal: displayRoboTotal,
                    roboTotalD: displayRoboTotalD,
                    RCPersonas: displayRCPersonas,
                    RCPersonasD: displayRCPersonasD,
                    RC:displayRC,
                    RCD:displayRCD,
                    DefensaJuridica:displayDefensaJuridica,
                    DefensaJuridicaD:displayDefensaJuridicaD,
                    GastosMedicosOcupantes: displayGastosMedicosOcupantes,
                    GastosMedicosOcupantesD: displayGastosMedicosOcupantesD
                });
            }                                                                           
          },err =>{
            console.log(err);
          });
      }    

      showAlertEdad( value, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setTitle(massage);
        alert.setCssClass('definidaX');

        for (let Edad of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Edad,
                 value: Edad
            });
         }
    
        alert.addButton('Cancelar');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Edad").innerHTML=testRadioResult;
            this.Edad=testRadioResult;
            this.edadCot=testRadioResult;
        }
        });
        alert.present();
    } 
    showAlertNacionalidad( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'nombre'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('nombre').innerHTML=data.username;
            }
            });
            alert.present();
        }
        
    }   
    showAlert( value, mode, modelList = [], massage=""){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'nombre'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('nombre').innerHTML=data.username;
            }
            });
            alert.present();
        
    }
    showAlertTitular( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'titularModal'      
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(JSON.stringify(data)); //to see the object
                console.log(data.username);
                document.getElementById('titular').innerHTML=data.username;
                this.titularCot=data.username;
        }
        });
        alert.present();
        
    }   
    tipoTres(valor){
        var testRadioOpen=false;
        var testRadioResult="";
        var cont=0;
        var contFinal=1;
        console.log("las direcciones available" +JSON.stringify(valor));
        let alert = this.alertCtrl.create();
        alert.setTitle('Selecciona la dirección deseada');
        alert.setCssClass('definidaY');  
        for (let key of valor) {         
            alert.addInput({
                 type: 'radio',
                 id: 'hola',
                 label: contFinal+' CALLE:'+valor[cont].Calle+' NO EXT:'+valor[cont].NoExt+' NO INT:'+valor[cont].NoInt+' COLONIA:'+valor[cont].Colonia+' CÓDIGO POSTAL:'+valor[cont].CodPostal+' POBLACIÓN:'+valor[cont].Poblacion+' CIUDAD:'+valor[cont].Ciudad+' ',
                 value: contFinal+' CALLE:'+valor[cont].Calle+' NO EXT:'+valor[cont].NoExt+' NO INT:'+valor[cont].NoInt+' COLONIA:'+valor[cont].Colonia+' CÓDIGO POSTAL:'+valor[cont].CodPostal+' POBLACIÓN:'+valor[cont].Poblacion+' CIUDAD:'+valor[cont].Ciudad+' ', 
                 //contFinal+' CALLE:'+valor[cont].Calle+' NO EXT:'+valor[cont].NoExt+' NO INT:'+valor[cont].NoInt+' COLONIA:'+valor[cont].Colonia+' CÓDIGO POSTAL:'+valor[cont].CodPostal+' POBLACIÓN:'+valor[cont].Poblacion+' CIUDAD:'+valor[cont].Ciudad+' '
                 //contFinal+' \nCALLE:'+valor[cont].Calle+' NO EXT:'+valor[cont].NoExt+' NO INT:'+valor[cont].NoInt+' COLONIA:'+valor[cont].Colonia+' CÓDIGO POSTAL:'+valor[cont].CodPostal+' POBLACIÓN:'+valor[cont].Poblacion+' CIUDAD:'+valor[cont].Ciudad+' ', 
                 //contFinal+' <h1>CALLE:</h1>'+valor[cont].Calle+' <br>NO EXT:<br>'+valor[cont].NoExt+' <br>NO INT:<br>'+valor[cont].NoInt+' COLONIA:'+valor[cont].Colonia+' CÓDIGO POSTAL:'+valor[cont].CodPostal+' POBLACIÓN:'+valor[cont].Poblacion+' CIUDAD:'+valor[cont].Ciudad+' '
                 //bueno contFinal+' CALLE:'+valor[cont].Calle+' NO EXT:'+valor[cont].NoExt+' NO INT:'+valor[cont].NoInt+' COLONIA:'+valor[cont].Colonia+' CÓDIGO POSTAL:'+valor[cont].CodPostal+' POBLACIÓN:'+valor[cont].Poblacion+' CIUDAD:'+valor[cont].Ciudad+' ', 
            });
            cont++;
            contFinal++;
            if (cont===(valor.length-1)){
                alert.addInput({
                    type: 'radio',
                    id: 'hola',
                    label: 'Añadir nueva dirección', 
                    value: 'Añadir nueva dirección',
               });                
                break;
            }
        }   
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
                handler: data => {
                    testRadioOpen = false;
                    testRadioResult = data;
                    console.log("se ha cicleado el valor: "+testRadioResult);
                    if(testRadioResult==='Añadir nueva dirección'){
                        //do something
                        this.isEnabledTipo3Dir=true;
                        this.isEnabled=false;
                        this.isEnabledTipo3=false;
                        console.log('nueva direccion');
                        this.retrieveData3();
                    }
                    else{
                        this.isEnabledTipo3Dir=false;
                        this.isEnabledTipo3=false;
                        var splitStr=testRadioResult.split(/\s+/);
                        var seleccion=splitStr[0];
                        var seleccionNum =(parseInt(seleccion))-1; 
                        this.retrieveData3();
                        console.log("se ha encotrado una incidencia en la pos"+seleccion);
                        document.getElementById("calle").innerHTML=valor[seleccionNum].Calle;
                        document.getElementById("noExt").innerHTML=valor[seleccionNum].NoExt;
                        document.getElementById("noInt").innerHTML=valor[seleccionNum].NoInt;
                        document.getElementById("colonia").innerHTML=valor[seleccionNum].Colonia;
                        document.getElementById("codigoPostal").innerHTML=valor[seleccionNum].CodPostal;
                        document.getElementById("nacionalidad").innerHTML='Mexicana';
                        document.getElementById("delegacion").innerHTML=valor[seleccionNum].Poblacion;
                        document.getElementById("codigoPostal").innerHTML=valor[seleccionNum].CodPostal;
                        document.getElementById("estado").innerHTML=valor[seleccionNum].Ciudad;


                    }
                }
        });
        alert.present();
    }        
    showAlertTelefonoCasa( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    type: 'tel',
                    name: 'username',
                    id: 'telefonoCasaModal'      
                    }
                ]
            });
            document.getElementById('telefonoCasaModal').setAttribute('maxlength', '3');
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('telefonoCasaModal').innerHTML=data.username;
                    document.getElementById('telefonoCasaU').innerHTML=data.username;
                    this.telefonoCasaCot=data.username;
            }
            });
            alert.present();
        }
        
    } 
    showAlertTelefonoMovil( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'nombre'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('telefonoMovilModal').innerHTML=data.username;
                    document.getElementById('telefonoMovilU').innerHTML=data.username;
                    this.movilCot=data.username;
            }
            });
            alert.present();
        }
        
    }        
    showAlertCP2( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                //type: 'number',   
                name: 'username',
                id: 'nombre'      
                }
            ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(JSON.stringify(data)); //to see the object
                console.log(data.username);
                document.getElementById('CP2').innerHTML=data.username;
        }
        });
        alert.present();        
    }   
    showAlertRFC( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'nombre'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('rfc').innerHTML=data.username;
                    document.getElementById('rfcU').innerHTML=data.username;
                    this.rfcCot=data.username;
            }
            });
            alert.present();
        }
        
    }        
    showAlertCodigoPostal( value, mode, modelList = [], massage=""){   
        if (this.isEnabledTipo3Dir==true){   
            var status='';
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                        //type: 'number',   
                        name: 'username',
                        id: 'nombre'      
                    }
                    ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    var cont=0;
                    document.getElementById('codigoPostal').innerHTML=data.username;    
                    this.cpCot=data.username;          
                    var url2='http://services.bunch.guru/WebService.asmx/ConsultaCP?CPostal='+data.username;
                    console.log("ESTO ESTA MANDANDO para checar el cp: "+url2);
                    this.userColonyList=[];
                    this.http.get(url2)
                    .map(res=> res.json())  
                    .subscribe(data=>{
                        console.log(data);
                        document.getElementById('delegacion').innerHTML=JSON.stringify(data.Municipio).replace(/"/g,''); 
                        this.delegacionCot=JSON.stringify(data.Municipio).replace(/"/g,'');
                        document.getElementById('estado').innerHTML=JSON.stringify(data.Estado).replace(/"/g,''); 
                        this.estadoCot=JSON.stringify(data.Estado).replace(/"/g,'');
                        for (let key of data.Colonias ) {
                            this.userColonyList.push(JSON.stringify(data.Colonias[cont].Colonia).replace(/"/g,''));
                            cont++;
                            console.log("las colonias avalaible" +this.userColonyList);
                        } 

                    },err =>{
                        console.log(err);
                    });                 
            }
            });
            alert.present();
        }    
        
    }     
    showAlertEmail( value, mode, modelList = [], massage=""){
        var id='';
        var status='';
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'nombre'      
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                document.getElementById('emailModal').innerHTML=data.username;
                document.getElementById('emailU').innerHTML=data.username; 
                this.emailCot=data.username;  
                var encodedString = btoa(data.username);             
                var url2='http://services.bunch.guru/WebService.asmx/validarCliente?param='+encodedString;
                console.log("ESTO ESTA MANDANDO para checar el correo: "+url2);
                this.http.get(url2)
                .map(res=> res.json())  
                .subscribe(data=>{
                  console.log(data);
                  status=(JSON.stringify(data.status)).replace(/"/g,'');
                  id=(JSON.stringify(data.id)).replace(/"/g,'');
                  if(status==='1'){
                    console.log("no existe, habilitar todos los campos");
                    this.isEnabled=true;
                    this.isEnabledTipo3=true;
                    this.isEnabledTipo3Dir=true;
                  }
                  if(status==='2'){
                    console.log("Existe, pero faltan datos. Completar los campos faltantes");
                    this.isEnabled=false;
                    this.isEnabledTipo3=true;
                    this.isEnabledTipo3Dir=true;
                    this.retrieveData();
                  }
                  if(status==='3'){
                    console.log("Se cuenta con toda la info, sólo tener el campo del domicilio");
                    this.isEnabled=false;
                    this.isEnabledTipo3=false;
                    var cont=0;
                    console.log("esto estoy recibiendo del id");
                    var encodedString=btoa('id='+id);
                    var url2='http://services.bunch.guru/WebService.asmx/ConsultarDirecciones?param='+encodedString;
                    console.log("id encriptado" + encodedString);
                   // this.userStateList=[];
                    this.http.get(url2)
                    .map(res=> res.json())  
                    .subscribe(data=>{
                        console.log(JSON.stringify(data));
                        this.userStateList=[];
                        for (let key of data.direccion ) {
                            this.userStateList.push({ 
                                Calle: JSON.stringify(data.direccion[cont].Calle).replace(/"/g,''),
                                NoExt: JSON.stringify(data.direccion[cont].NoExt).replace(/"/g,''),
                                NoInt: JSON.stringify(data.direccion[cont].NoInt).replace(/"/g,''),
                                Colonia: JSON.stringify(data.direccion[cont].Colonia).replace(/"/g,''),
                                CodPostal: JSON.stringify(data.direccion[cont].CodPostal).replace(/"/g,''),
                                Poblacion: JSON.stringify(data.direccion[cont].Poblacion).replace(/"/g,''),
                                Ciudad: JSON.stringify(data.direccion[cont].Ciudad).replace(/"/g,''),
                                IdDir: JSON.stringify(data.direccion[cont].IdDir).replace(/"/g,'')
                            });                               
                            //this.userStateList.push(JSON.stringify(data.direccion[cont].Colonia).replace(/"/g,''),JSON.stringify(data.direccion[cont].CodPostal).replace(/"/g,''));
                            cont++;
                            console.log("esto se esta metiendo"+this.userStateList);
                        } 
                        this.userStateList.push({
                            Calle: 'Añadir nueva dirección',
                            NoExt: '',
                            NoInt: '',
                            Colonia: '',
                            CodPostal: '',
                            Poblacion: '',
                            Ciudad: '',
                            IdDir: ''
                        });
                        console.log("dire completas"+this.userStateList);
                        this.tipoTres(this.userStateList);
            
                    },err =>{
                        console.log(err);
                    });               

                  }                                       

                },err =>{
                  console.log(err);
                });                 
        }
        });
        alert.present();
        
    }    
    showAlertGenero( value, mode, modelList = [], massage=""){
        if (this.isEnabled==true){
            //this.alertSrv.showAlert(value, mode, modelList, massage);
            var testRadioOpen=false;
            var testRadioResult="";
            let alert = this.alertCtrl.create();
            alert.setTitle(massage);
            alert.setCssClass('definidaX');
        
            for (let item of this.userGenderList) {
                alert.addInput({
                    type: 'radio',
                    label: item,
                    value: item
                });
            }
        
            alert.addButton('Cancelar');
            alert.addButton({
            text: 'OK',
            handler: data => {
                testRadioOpen = false;
                testRadioResult = data;
                console.log("se ha cicleado el valor: "+testRadioResult);
                document.getElementById("genero").innerHTML=testRadioResult;
                this.Gender=testRadioResult;
                this.generoCot=testRadioResult;
            }
            });
            alert.present();
        }

    }   
    showAlertNombre( value, mode, modelList = [], massage=""){
        if (this.isEnabled==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'cp'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('nombre').innerHTML=data.username;
                    document.getElementById('nombreU').innerHTML=data.username;
                    this.nombreCot=data.username;
            }
            });
            alert.present();
        }
        
    }
    showAlertApellidoP( value, mode, modelList = [], massage=""){
        if (this.isEnabled==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'cp'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('paterno').innerHTML=data.username;
                    document.getElementById('paternoU').innerHTML=data.username;
                    this.apellidoPCot=data.username;
            }
            });
            alert.present();
        }
        
    }
    showAlertApellidoM( value, mode, modelList = [], massage=""){
        if (this.isEnabled==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'cp'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('materno').innerHTML=data.username;
                    document.getElementById('maternoU').innerHTML=data.username;
                    this.apellidoMCot=data.username;
            }
            });
            alert.present();
        }    
        
    }       
    showAlertLugarDeNacimiento( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3==true){
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'lugarNac'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('lugarNac').innerHTML=data.username;
                    this.lugarDeNacimientoCot=data.username;
            }
            });
            alert.present();
        }
        
    }     
    showAlertCvv( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  type: 'number',   
                  name: 'username',
                  id: 'cvvModal',  
                  min: 10,
                  max:10    
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(JSON.stringify(data)); //to see the object
                console.log(data.username);
                document.getElementById('cvv').innerHTML=data.username;
                this.cvvCot=data.username;
        }
        });
        alert.present();
        
    }
    showAlertNumeroDeSerie( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'numeroDeSerie'      
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(JSON.stringify(data)); //to see the object
                console.log(data.username);
                document.getElementById('noSerie').innerHTML=data.username;
                this.noDeSerieCot=data.username;
        }
        });
        alert.present();
        
    }
    showAlertNumeroDePlacas( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'numeroDePlacas'      
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(JSON.stringify(data)); //to see the object
                console.log(data.username);
                document.getElementById('noPlacas').innerHTML=data.username;
                this.noDePlacasCot=data.username;
        }
        });
        alert.present();
        
    }
    showAlertNumeroDeMotor( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'numeroDeMotor'      
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                console.log(JSON.stringify(data)); //to see the object
                console.log(data.username);
                document.getElementById('noMotor').innerHTML=data.username;
                this.noDeMotorCot=data.username;
        }
        });
        alert.present();
        
    } 
    showAlertCalle( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3Dir==true)
        {
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'calle'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('calle').innerHTML=data.username;
                    this.calleCot=data.username;
            }
            });
            alert.present();
        }    
        
    } 
    showAlertNoExt( value, mode, modelList = [], massage=""){
        if (this.isEnabledTipo3Dir==true)
        {
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'exterior'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('noExt').innerHTML=data.username;
                    this.noExtCot=data.username;
            }
            });
            alert.present();
        }
        
    }
    showAlertNoInt( value, mode, modelList = [], massage=""){
        if(this.isEnabledTipo3Dir==true)
        {
            let alert = this.alertCtrl.create({
                inputs: [
                    {   
                    //type: 'number',   
                    name: 'username',
                    id: 'interior'      
                    }
                ]
            });
            alert.setTitle(massage);  
            alert.setCssClass('definidaX'); 
            alert.addButton('Cancelar');
            alert.addButton({
                text: 'OK',
                handler: data => {
                    console.log(JSON.stringify(data)); //to see the object
                    console.log(data.username);
                    document.getElementById('noInt').innerHTML=data.username;
                    this.noIntCot=data.username;
            }
            });
            alert.present();
        }
        
    }                          
    showAlertTarjeta( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'noTarjetaModal'      
                }
              ]
        });
        alert.setTitle(massage);  
        alert.setCssClass('definidaX'); 
        alert.addButton('Cancelar');
        alert.addButton({
            text: 'OK',
            handler: data => {
                var tdc='';
                var scheme='';
                var type='';
                var bank='';
                var flag=0;
                //console.log("se ha dado la tarjeta"+(<HTMLInputElement>document.getElementById('noTarjetaModal')).value); 
                tdc=(<HTMLInputElement>document.getElementById('noTarjetaModal')).value;
                document.getElementById("noTarjeta").innerHTML=(<HTMLInputElement>document.getElementById('noTarjetaModal')).value;
                this.noTarjetaCot=(<HTMLInputElement>document.getElementById('noTarjetaModal')).value;
                this.http.get('https://lookup.binlist.net/'+tdc)
                .map(res=> res.json())
                .subscribe(data=>{
                    this.data = data;
                    console.log(this.data);
                    scheme=JSON.stringify(data.scheme).replace(/"/g,'');
                    type=JSON.stringify(data.type).replace(/"/g,'');
                    
                    try {
                        bank=((JSON.stringify(data.bank.name)).replace(/"/g,''));
                    } catch (exception) {
                        flag=1;
                        console.log("se insertara amex");
                    }                    
                    //Para quitar caracteres especiales al banco y dejarlo en minus, pero con la primera letra en mayus
                    if (flag===1){
                        bank='Amex';
                    }
                    else{
                        bank=bank.toLowerCase();
                        bank=bank.charAt(0).toUpperCase() + bank.slice(1);
                    }

                    console.log("el scheme es" +scheme+"el nombre del carrier es "+bank+"el typee es "+type);
                    if (scheme==='MASTERCARD'){
                        document.getElementById("cvv").innerHTML="123";
                        this.carrierCot='1';
                        this.master();
                    }
                    if (scheme==='AMEX'){
                        document.getElementById("cvv").innerHTML="1234";
                        this.carrierCot='2';
                        this.amex();
                    } 
                    if (scheme==='VISA'){
                        document.getElementById("cvv").innerHTML="123";
                        this.carrierCot='0';
                        this.visa();
                    }                                       
                    //conversion a espanol lo que devuelve el ws
                    if(type==='CREDIT'){
                        type='Crédito';
                        this.tipoCot='CREDITO';
                    } 
                    else{
                        type='Débito';
                        this.tipoCot='DEBITO';
                    }
                    //
                    //Inserción de los datos anteriores en la página
                    document.getElementById("type").innerHTML=type;
                    document.getElementById("bank").innerHTML=bank;
                    this.bancoCot=bank;
                    
                    
                },err =>{
                    console.log(err);
                });                  
        }
        });
        alert.present();
        
    }

    showAlertPrima( value, valor, mode, modelList = [], massage=""){
        //this.alertSrv.showAlert(value, mode, modelList, massage);
        var testRadioOpen=false;
        var testRadioResult="";
        let alert = this.alertCtrl.create();
        alert.setCssClass('definida');
        console.log("el valor es "+JSON.stringify(valor.value));
        alert.setTitle('<center>'+valor.asegur+'</center>');
        alert.setMessage(
            '<table class="tablaModal">'+
            '<tr>'+
            '  <td>'+
            '  <img src="'+valor.img+'">'+
            '  </td>'+
            '  <td>'+
            '    <table class="tablaModal">'+
               '   <tr>'+
                    '<th>Cobertura</th>'+
                    '<th>Periodicidad</th>'+
                  '</tr>'+
                  '<tr>'+
                    '<td>Amplia</td>'+
                    '<td>Anual</td>'+
                  '</tr>'+
                '</table>'+
              '</td>'+
            '</tr>'+
         ' </table>'+
            
            '<table>'+
            '<tr><th></th><th><strong>Suma Asegurada</strong></th>'+
            '<th><strong>Deducible</strong></th></tr>'+
            '<tr><td><strong>Prima total</strong></str><td><center><strong>' +valor.value +'</strong></center></td><td><center><strong>'+'</strong></center></td></tr>'+
            '<tr><td><strong>Daños materiales</strong><td><center><strong>' +valor.danosMateriales+'</strong></center></td><td><center><strong>'+valor.danosMaterialesD+'</strong></center></td></tr>'+
            '<tr><td><strong>Robo Total</strong><td><center><strong>' +valor.roboTotal+'</strong></center></td><td><center><strong>'+valor.roboTotalD+'</strong></center></td></tr>'+
            '<tr><td><strong>RC Personas</strong><td><center><strong>' +valor.RCPersonas+'</strong></center></td><td><center><strong>'+valor.RCPersonasD+'</strong></center></td></tr>'+
            '<tr><td><strong>RC</strong><td><center><strong>' +valor.RC+'</strong></center></td><td><center><strong>'+valor.RCD+'</strong></center></td></tr>'+
            '<tr><td><strong>Def. Jurídica</strong><td><center><strong>' +valor.DefensaJuridica+'</strong></center></td><td><center><strong>'/*+valor.defensaJuridicaD*/+'-</strong></center></td></tr>'+
            '<tr><td><strong>Gastos Médicos Oc.</strong><td><center><strong>' +valor.GastosMedicosOcupantes+'<strong></center></td><td><center><strong>'/*+valor.GastosMedicosOcupantesD*/+'-</strong></center></td></tr>'+
            '</table>'+
            '<hr>'
        );
    
    
        alert.addButton('Regresar');
        alert.addButton({
          text: 'Contratar',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            this.Edad=testRadioResult;
            document.getElementById("marcaF").innerHTML=valor.asegur;
            document.getElementById("primaF").innerHTML=valor.value;
            this.aseguradoraCot=valor.asegur;
            this.claveCot=valor.clave;
            var myAnchor = document.getElementById("imgF");
            var mySpan = document.createElement("IMG");
            mySpan.setAttribute("src", valor.img);
            mySpan.setAttribute("id", "imgF");
            mySpan.setAttribute("width", "40");
            mySpan.setAttribute("height", "40");
            mySpan.setAttribute("margin-left", "-40");
            myAnchor.parentNode.replaceChild(mySpan, myAnchor);
            this.pagoList[0].subText=(valor.danosMateriales).replace(/"|-N|-S|-D|DAÑOS|MATERIALES/g,'');
            this.pagoList[1].subText=(valor.roboTotal).replace(/"|-N|-S|-D|ROBO|TOTAL/g,'');
            this.pagoList[2].subText=(valor.RCPersonas).replace(/"|-N|-S|-D|NRC|PERSONAS|RC/g,'');
            this.pagoList[3].subText=(valor.RC).replace(/"|-N|-S|-D|RESPONSABILIDAD|CIVIL/g,'');
            this.pagoList[4].subText=(valor.DefensaJuridica).replace(/"|-N|-S|-D|GASTOS|LEGALES/g,'');
            this.pagoList[5].subText=(valor.GastosMedicosOcupantes).replace(/"|GASTOS|MEDICOS/g,'');
            this.changeTab('Cliente');
        }
        });
        alert.present();
    }       
    
    datePickerNames:any;
    public datePicked: string ;
    public vigencia: string ;
    public datePickedBirth: string;
    private topTab = 'Cliente';
    private isClient:any;
    private local:any;
    private comparaDetailShown: boolean = false;
    private productoContinuarShown: boolean = false;
    private underTabsTitile = localStorage.getItem("language") == "en"?'Car insurance':'Seguro de Auto';
    private isEnglish = localStorage.getItem("language") == "en";
    private comparaList = [];
    private pagoList = [
        {
            mainText: localStorage.getItem("language") == "en"?"Material damage:":"Daños materiales: ",
            subText: localStorage.getItem("language") == "en"?"5% V. trade":"5% V. comercial"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Total theft:":"Robo Total: ",
            subText: localStorage.getItem("language") == "en"?"10% V. commerce":"10% V. comercial"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"RC people:":"RC personas: ",
            subText: localStorage.getItem("language") == "en"?"3,000,000.0":"3,000,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"RC:":"RC: ",
            subText: localStorage.getItem("language") == "en"?"800,000.0":"800,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Legal defense:":"Defensa legal: ",
            subText: localStorage.getItem("language") == "en"?"AMPARAD":"AMPARADA"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"Medical expenses:":"Gastos médicos OC: ",
            subText: localStorage.getItem("language") == "en"?"50.000.0":"50,000.00"
        },
    ];
    private prevPage:any;

    private userName = {name:'Miguel Ivan Hernández'};
    private userNameModal = {name:''};
    private userNameModalP = {name:''};
    private userNameModalM = {name:''};
    private userCreditCard = {name:''};
    private userEmail = {name:''};
    private userCellPhoneNumber: any = {name:''}; //n
    private userHomePhoneNumber: any = {name:''}; //
    private userCvv: any = {name:'5529558232'}; //n
    private userPostalCode = {name:''}; //n
    private userStreetName = {name:''};
    private userOutdoorNumber = {name:''};
    private userInteriorNumber = {name:''};

    private userGender = {name:''}; //d
    private userGenderList = ['Masculino','Femenino'];
    private userRFC = {name:''}; //d
    private userRFCList = [''];
    private userLugarNac = {name:''}; //d
    private userLugarNacList = [''];
    private userNacionalidad = {name:''}; //d
    private userNacionalidadList = [''];    
    private userColony = {name:''}; //d
    private userColonyList = [];
    private userState = {name:''}; //d
    private userStateList = [];
    private userDelegation = {name:''}; //d
    private userDelegationList = ['Ciudad de México','Ciudad de México1','Ciudad de México2'];
    private userBrand = {name:''}; // Seleccione la marca
    private userModel = {name:''}; //d Seleccione el modelo
    private userModelList = [];
    private userDescription = {name:''}; //d Seleccione la descripcion
    private userSubDescription = {name:''}; //d Seleccione la sub descripcion
    private userDescriptionList = [];
    private userEdad = {name:'Seleccione la edad descripcion'}; //d
    private userEdadList = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70];   
    private userDetalleList = [];
    private userSubDescriptionList = [];
    private userSerialNumber = {}; //d
    private userSerialNumberList = ['HEAH876542KLOP','HEAH87LOP','HEKLOP'];
    private userPlates = {name:'HEM987'}; //d
    private userPlatesList = ['HEM987','HEM9','HE87'];


    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public modalCtrl: ModalController, public alertSrv: AlertService, public localizationModal: LocalizationModel, public alertCtrl: AlertController, private storage: Storage) {
        this.prevPage = this.navParams.get("prevPage");
        this.isClient = localStorage.getItem("isClient");
        this.prevPage == "chat"? this.topTab ="Compara" : this.isClient=="true"?this.topTab ="Producto":this.topTab ="Producto";
        this.datePickerNames = this.localizationModal.getDatesNames();
    }
    retrieveData(){
        var encodedString=btoa(this.emailCot);
        console.log("esto se mandara a consultadatoscli"+encodedString);
        this.http.get('http://services.bunch.guru/WebService.asmx/ConsultaDatosCli?param='+encodedString)
        .map(res=> res.json())
        .subscribe(data=>{
            this.data = data;
            document.getElementById('nombre').innerHTML=(JSON.stringify(data.Nombre)).replace(/"/g,'');
            document.getElementById('paterno').innerHTML=(JSON.stringify(data.ApellidoPat)).replace(/"/g,'');
            document.getElementById('materno').innerHTML=(JSON.stringify(data.ApellidoMat)).replace(/"/g,'');
            document.getElementById('firstname').innerHTML=(JSON.stringify(data.FechaNacimiento)).replace(/"/g,'');
            document.getElementById('genero').innerHTML=(JSON.stringify(data.Genero)).replace(/"/g,'');
        },err =>{
            console.log(err);
        });         
    }
    retrieveData3(){
        var encodedString=btoa(this.emailCot);
        console.log("esto se mandara a consultadatoscli"+encodedString);
        this.http.get('http://services.bunch.guru/WebService.asmx/ConsultaDatosCli?param='+encodedString)
        .map(res=> res.json())
        .subscribe(data=>{
            this.data = data;
            document.getElementById('nombre').innerHTML=(JSON.stringify(data.Nombre)).replace(/"/g,'');
            document.getElementById('paterno').innerHTML=(JSON.stringify(data.ApellidoPat)).replace(/"/g,'');
            document.getElementById('materno').innerHTML=(JSON.stringify(data.ApellidoMat)).replace(/"/g,'');
            document.getElementById('firstname').innerHTML=(JSON.stringify(data.FechaNacimiento)).replace(/"/g,'');
            document.getElementById('genero').innerHTML=(JSON.stringify(data.Genero)).replace(/"/g,'');
            document.getElementById('rfc').innerHTML=(JSON.stringify(data.RFC)).replace(/"/g,'');
            document.getElementById('nacionalidad').innerHTML=(JSON.stringify(data.Nacionalidad)).replace(/"/g,'');
            document.getElementById('lugarNac').innerHTML=(JSON.stringify(data.LugarNacimiento)).replace(/"/g,'');
            document.getElementById('telefonoCasaU').innerHTML=(JSON.stringify(data.Telefono)).replace(/"/g,'');
        },err =>{
            console.log(err);
        });         
    }    
    crearCliente(){
        this.storage.get('name').then((val) => {
            console.log('Your age is', val);
            this.local=val;
            console.log('Valor de local', this.local); 
        if (this.generoCot==='Masculino')
            this.generoCot='MASCULINO';
        else    
            this.generoCot='FEMENINO';
        //llenar datos
        console.log( 'para crearcliente'+'nombre='+this.nombreCot+'&app='+this.apellidoPCot+'&apm='+this.apellidoMCot+'&genero='+this.generoCot+'&edad='+this.edadCot+'&email='+this.emailCot+'&telefono='+this.movilCot+'&RFC='+this.rfcCot+'&nacionalidad=MEXICANA&lugNacimiento='+this.lugarDeNacimientoCot+'&cp='+this.cpCot+'&calle='+this.calleCot+'&noExt='+this.noExtCot+'&noInt='+this.noIntCot+'&colonia='+this.coloniaCot+'&delegacion='+this.delegacionCot+'&estado='+this.estadoCot+'&telefono2='+this.telefonoCasaCot+'&fechaNac='+this.datePickedBirth+'&idContVend='+this.local);
        var encodedString=btoa(          'nombre='+this.nombreCot+'&app='+this.apellidoPCot+'&apm='+this.apellidoMCot+'&genero='+this.generoCot+'&edad='+this.edadCot+'&email='+this.emailCot+'&telefono='+this.movilCot+'&RFC='+this.rfcCot+'&nacionalidad=MEXICANA&lugNacimiento='+this.lugarDeNacimientoCot+'&cp='+this.cpCot+'&calle='+this.calleCot+'&noExt='+this.noExtCot+'&noInt='+this.noIntCot+'&colonia='+this.coloniaCot+'&delegacion='+this.delegacionCot+'&estado='+this.estadoCot+'&telefono2='+this.telefonoCasaCot+'&fechaNac='+this.datePickedBirth+'&idContVend='+this.local);
        console.log("esto se mandará para crearCliente"+encodedString);
        console.log('http://services.bunch.guru/WebService.asmx/CrearCliente?param='+encodedString);
        this.http.get('http://services.bunch.guru/WebService.asmx/CrearCliente?param='+encodedString)
        .map(res=> res.json())
        .subscribe(data=>{
            console.log("responde de los datos"+JSON.stringify(data));
            this.idCliCot=(JSON.stringify(data.idCli).replace(/"/g,''));
            this.idDirCot=(JSON.stringify(data.idDir).replace(/"/g,''));
            this.idContCot=(JSON.stringify(data.idCont).replace(/"/g,''));
            console.log('idcliCot'+this.idCliCot+'idDirCot'+this.idDirCot+'idContCot'+this.idContCot);
        },err =>{
            console.log(err);
        }); 
        }); 
    }
    ionViewDidEnter(){
        if(localStorage.getItem("isClient") == "true"){
            setTimeout(()=>{
                if(document.getElementById("tab-t0-5") && document.getElementById("tab-t0-4")) {
                    document.getElementById("tab-t0-4").setAttribute("aria-selected", "true");
                    document.getElementById("tab-t0-5").setAttribute("aria-selected", "false");
                }
            },50);
        }
        if(localStorage.getItem("isFirstEnterToHomeScreeb") == "true") {
            this.navCtrl.push(ProductsPage, null, {animate: false});
        }
    }
    ionViewWillLeave(){
        if(document.getElementById("tab-t0-5") && document.getElementById("tab-t0-4")){
            document.getElementById("tab-t0-4").setAttribute("aria-selected", "false");
            document.getElementById("tab-t0-5").setAttribute("aria-selected", "false");
        }
    }
    changeTab(tabName, tabFrom = ''){
        console.log("la tab que se selecciona"+tabName);
        if(tabName==='Producto'){
            document.getElementById("steps").innerHTML="Paso 1 de 5";
        }
        if(tabName==='Compara'){
            document.getElementById("steps").innerHTML="Paso 2 de 5";
        }   
        if(tabName==='Cliente'){
            document.getElementById("steps").innerHTML="Paso 3 de 5";
        }       
        if(tabName==='Pago'){
            document.getElementById("steps").innerHTML="Paso 4 de 5";
        }
        if(tabName==='Tarjeta'){
            document.getElementById("steps").innerHTML="Paso 5 de 5";
            this.crearCliente();
        }   
                      
       //document.getElementById("nuevo").style.color = "green";

       var background_color='red !important';
       tabName == 'Pago'? this.underTabsTitile = localStorage.getItem("language") == "en"?'Summary':'Resumen': this.underTabsTitile = localStorage.getItem("language") == "en"?'Car insurance':'Seguro de Auto';
       tabFrom == 'Cliente'?this.showProductoContinuarShown():'';
       this.topTab = tabName;
        this.comparaDetailShown = false;

    }
    showProductoContinuarShown(){
        this.productoContinuarShown = true;
    }
    showComparaItemDetail(){
        this.comparaDetailShown = true;
    }
    //para mandar el pago
    goPaymentSubmitedPage(){
        this.storage.get('name').then((val) => {
            var locale=val;
        //para las fechas de la vigencia
        var encodedString='';
        this.anioCot=this.vigencia.split('-')[0];
        this.mesCot=this.vigencia.split('-')[1];
        //checkpoint
        var consulta='usuario=Bunch&Password=BunCH2O18&data={"Aseguradora":"'+this.aseguradoraCot+'","Cliente":{"TipoPersona":"F","Nombre":"'+this.nombreCot+'","ApellidoPat":"'+this.apellidoPCot+'","ApellidoMat":"'+this.apellidoMCot+'","RFC":"'+this.rfcCot+'","FechaNacimiento":"'+this.datePickedBirth+'","Ocupacion":"EMPLEADO","CURP":null,"Direccion":{"Calle":"'+this.calleCot+'","NoExt":"'+this.calleCot+'","NoInt":"'+this.noIntCot+'","Colonia":"'+this.coloniaCot+'","CodPostal":"'+this.cpCot+'","Poblacion":"'+this.delegacionCot+'","Ciudad":"'+this.estadoCot+'","Pais":"MÉXICO"},"Edad":'+this.edadCot+',"Genero":"'+this.generoCot+'","Telefono":"'+this.telefonoCasaCot+'","Email":"'+this.emailCot+'"},"Vehiculo":{"Uso":"PARTICULAR","Marca":"'+this.Marca+'","Modelo":"'+this.Modelo+'","NoMotor":"'+this.noDeMotorCot+'","NoSerie":"'+this.noDeSerieCot+'","NoPlacas":"'+this.noDePlacasCot+'","Descripcion":"'+this.Descripcion+'","CodMarca":"","CodDescripcion":"","CodUso":"","Clave":'+this.claveCot+',"Servicio":"PARTICULAR"},"Coberturas":[],"Paquete":"AMPLIA","Descuento":null,"PeriodicidadDePago":0,"Cotizacion":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"CotID":null,"VerID":null,"CotIncID":null,"VerIncID":null,"Resultado":null},"Emision":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"Terminal":null,"Documento":null,"Poliza":null,"Resultado":null},"Pago":{"MedioPago":"'+this.tipoCot+'","NombreTarjeta":"'+this.titularCot+'","Banco":"'+this.bancoCot+'","NoTarjeta":"'+this.noTarjetaCot+'","MesExp":"'+this.mesCot+'","AnioExp":"'+this.anioCot+'","CodigoSeguridad":"'+this.cvvCot+'","NoClabe":null,"Carrier":'+this.carrierCot+'},"CodigoError":null,"urlRedireccion":null}&movimiento=emision&idContVend='+locale+'&idcont='+this.idContCot+'&idcli='+this.idCliCot+'&iddir='+this.idDirCot;
        console.log("se ha mandado el pago con los datos:"+consulta);
        encodedString=btoa(consulta);
        console.log("se ha mandado el pago con los datos en btoa:"+encodedString);
        this.navCtrl.push(PaymentSubmittedPage, {prevPage:this.prevPage}, {animate: true});
        });
    }
    goToDocumentDetailPage(){
        this.navCtrl.push(DocumentDetailPage);
    }
    goToPayPolicyPage(){
        let modal = this.modalCtrl.create(PayPolicyPage);
        modal.onDidDismiss(data => {
            if(data) {
                let tmp = document.getElementById("tab-t0-4").setAttribute("aria-selected","false");
                tmp = document.getElementById("tab-t0-5").setAttribute("aria-selected","true");
                this.navCtrl.push(ProductsPage, {prevPage:"AcqureProductsPage"}, false);
            }
        });
        modal.present();
    }
    goBack(){
        let tmp = document.getElementById("tab-t0-4").setAttribute("aria-selected","false");
        tmp = document.getElementById("tab-t0-5").setAttribute("aria-selected","true");
        this.navCtrl.pop();
    }

}
