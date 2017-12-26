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
    Modelo:string;
    Descripcion:string;
    SubDescripcion:string;
    Detalle:string;
    Edad:string;
    public userBrandList =  [];
    isEnabled:boolean;

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
        
        var myJSON='{"Aseguradora":'+aseguradora+',"Cliente":{"TipoPersona":null,"Nombre":null,"ApellidoPat":null,"ApellidoMat":null,"RFC":null,"FechaNacimiento":"19/11/1988","Ocupacion":null,"CURP":null,"Direccion":{"Calle":null,"NoExt":null,"NoInt":null,"Colonia":null,"CodPostal":"04100","Poblacion":null,"Ciudad":null,"Pais":null},"Edad":28,"Genero":"Masculino","Telefono":null,"Email":null},"Vehiculo":{"Uso":"PARTICULAR","Marca":"'+this.Marca+'","Modelo":"'+this.Modelo+'","NoMotor":"","NoSerie":"","NoPlacas":"","Descripcion":'+descripcionAseguradora+',"CodMarca":"","CodDescripcion":"","CodUso":"","Clave":'+clave+',"Servicio":"PARTICULAR"},"Coberturas":[],"Paquete":"AMPLIA","Descuento":null,"PeriodicidadDePago":0,"Cotizacion":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"CotID":null,"VerID":null,"CotIncID":null,"VerIncID":null,"Resultado":null},"Emision":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"Terminal":null,"Documento":null,"Poliza":null,"Resultado":null},"Pago":{"MedioPago":null,"NombreTarjeta":null,"Banco":null,"NoTarjeta":null,"MesExp":null,"AnioExp":null,"CodigoSeguridad":null,"NoClabe":null,"Carrier":0},"CodigoError":null,"urlRedireccion":null}';
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
            if(aseguradora==='ANA' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
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
            }
            if(aseguradora==='AXA' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
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
            if(aseguradora==='GNP' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
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
            }
            if(aseguradora==='GREAT' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
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
            if(aseguradora==='HDI' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
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
            }  
            if(aseguradora==='MAPFRE' && displayPrimaTotal!=="null" && !isNaN(displayPrimaTotalInt) && displayDanosMateriales!==null && displayDanosMateriales!=='undefined'){
                this.comparaList.push({ 
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
        }
        });
        alert.present();
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
    showAlertTelefonoCasa( value, mode, modelList = [], massage=""){
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
                document.getElementById('telefonoCasaModal').innerHTML=data.username;
                document.getElementById('telefonoCasaU').innerHTML=data.username;
        }
        });
        alert.present();
        
    } 
    showAlertTelefonoMovil( value, mode, modelList = [], massage=""){
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
        }
        });
        alert.present();
        
    }        
    showAlertRFC( value, mode, modelList = [], massage=""){
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
        }
        });
        alert.present();
        
    }    
    showAlertEmail( value, mode, modelList = [], massage=""){

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
                var encodedString = btoa(data.username);             
                var url2='http://services.bunch.guru/WebService.asmx/validarCliente?param='+encodedString;
                console.log("ESTO ESTA MANDANDO para checar el correo: "+url2);
                this.http.get(url2)
                .map(res=> res.json())  
                .subscribe(data=>{
                  console.log(data);
                  status=(JSON.stringify(data.status)).replace(/"/g,'');
                  if(status==='1'){
                    console.log("no existe, habilitar todos los campos");
                    this.isEnabled=true;
                  }
                  if(status==='2'){
                    console.log("Existe, pero faltan datos. Completar los campos faltantes");
                    this.isEnabled=false;
                  }
                  if(status==='3'){
                    console.log("Se cuenta con toda la info, sólo tener el campo del domicilio");
                    this.isEnabled=false;
                  }                                       

                },err =>{
                  console.log(err);
                });                 
        }
        });
        alert.present();
        
    }    
    showAlertGenero( value, mode, modelList = [], massage=""){
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
            document.getElementById("Marca").innerHTML=testRadioResult;
            document.getElementById("marcaU").innerHTML=testRadioResult;
            this.userModelList = [];
            this.Marca=testRadioResult;
            this.getModelo();
        }
        });
        alert.present();

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
        }
        });
        alert.present();
    }
        
    }
    showAlertApellidoP( value, mode, modelList = [], massage=""){
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
        }
        });
        alert.present();
        
    }
    showAlertApellidoM( value, mode, modelList = [], massage=""){
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
        }
        });
        alert.present();
        
    }        
    showAlertCvv( value, mode, modelList = [], massage=""){
        let alert = this.alertCtrl.create({
            inputs: [
                {   
                  //type: 'number',   
                  name: 'username',
                  id: 'cvvModal'      
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
        }
        });
        alert.present();
        
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
                        this.master();
                    }
                    if (scheme==='AMEX'){
                        document.getElementById("cvv").innerHTML="1234";
                        this.amex();
                    } 
                    if (scheme==='VISA'){
                        document.getElementById("cvv").innerHTML="123";
                        this.visa();
                    }                                       
                    //conversion a espanol lo que devuelve el ws
                    if(type==='CREDIT'){
                        type='Crédito';
                    } 
                    else{
                        type='Débito';
                    }
                    //
                    //Inserción de los datos anteriores en la página
                    document.getElementById("type").innerHTML=type;
                    document.getElementById("bank").innerHTML=bank;
                    
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
    private topTab = 'Cliente';
    private isClient:any;
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
    private userNameModal = {name:'Miguel Ivan'};
    private userNameModalP = {name:'Hernandez'};
    private userNameModalM = {name:'Materno'};
    private userCreditCard = {name:''};
    private userEmail = {name:'mivan2021g@gmail.com'};
    private userCellPhoneNumber: any = {name:'5529558232'}; //n
    private userHomePhoneNumber: any = {name:'554655055'}; //
    private userCvv: any = {name:'5529558232'}; //n
    private userPostalCode = {name:'14390'}; //n
    private userStreetName = {name:'Hda Montecillo'};
    private userOutdoorNumber = {name:'128 b'};
    private userInteriorNumber = {name:'12 a'};

    private userGender = {name:'Male'}; //d
    private userGenderList = ['Masculino','Femenino'];
    private userRFC = {name:'EEEE000000111'}; //d
    private userRFCList = ['EEEE000000111'];
    private userLugarNac = {name:'CDMX'}; //d
    private userLugarNacList = ['CDMX'];
    private userNacionalidad = {name:'Mexicana'}; //d
    private userNacionalidadList = ['Mexicana'];    
    private userColony = {name:'Villa Coapa'}; //d
    private userColonyList = ['Villa Coapa','Villa Coapa1','Villa Coapa2'];
    private userState = {name:'Ciudad de México'}; //d
    private userStateList = ['Ciudad de México','Ciudad de México1','Ciudad de México2'];
    private userDelegation = {name:'Ciudad de México'}; //d
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


    constructor(public navCtrl: NavController, public http: Http, public navParams: NavParams, public modalCtrl: ModalController, public alertSrv: AlertService, public localizationModal: LocalizationModel, public alertCtrl: AlertController) {
        this.prevPage = this.navParams.get("prevPage");
        this.isClient = localStorage.getItem("isClient");
        this.prevPage == "chat"? this.topTab ="Compara" : this.isClient=="true"?this.topTab ="Producto":this.topTab ="Producto";
        this.datePickerNames = this.localizationModal.getDatesNames();
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
        if(tabName==='Tarjeta'){
            document.getElementById("steps").innerHTML="Paso 4 de 5";
        }   
        if(tabName==='Pago'){
            document.getElementById("steps").innerHTML="Paso 5 de 5";
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
    goPaymentSubmitedPage(){
        this.navCtrl.push(PaymentSubmittedPage, {prevPage:this.prevPage}, {animate: true});
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
