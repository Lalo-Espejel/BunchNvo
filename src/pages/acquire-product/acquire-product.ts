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
    url:string;
    data:string;
    Marca:string;
    Modelo:string;
    Descripcion:string;
    SubDescripcion:string;
    Detalle:string;
    Edad:string;
    public userBrandList =  [];

    ionViewDidLoad(){
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
    
        for (let Marca of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Marca,
                 value: Marca
            });
         }
    
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Marca").innerHTML=testRadioResult;
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
    
        for (let Modelo of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Modelo,
                 value: Modelo
            });
         }
    
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Modelo").innerHTML=testRadioResult;
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
    
        for (let Descripcion of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Descripcion,
                 value: Descripcion
            });
         }
    
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("Descripcion").innerHTML=testRadioResult;
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
    
        for (let SubDescripcion of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: SubDescripcion,
                 value: SubDescripcion
            });
         }
    
        alert.addButton('Cancel');
        alert.addButton({
          text: 'OK',
          handler: data => {
            testRadioOpen = false;
            testRadioResult = data;
            console.log("se ha cicleado el valor: "+testRadioResult);
            document.getElementById("SubDescripcion").innerHTML=testRadioResult;
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
    
        for (let Detalle of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Detalle,
                 value: Detalle
            });
         }
    
        alert.addButton('Cancel');
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
        var strJ="";  
        var conta=0;
        var data2="";
        var displayPrimaTotal="";
        var displayPrimaTotalInt=0;
        
        var myJSON='{"Aseguradora":'+aseguradora+',"Cliente":{"TipoPersona":null,"Nombre":null,"ApellidoPat":null,"ApellidoMat":null,"RFC":null,"FechaNacimiento":"19/11/1988","Ocupacion":null,"CURP":null,"Direccion":{"Calle":null,"NoExt":null,"NoInt":null,"Colonia":null,"CodPostal":"04100","Poblacion":null,"Ciudad":null,"Pais":null},"Edad":28,"Genero":"Masculino","Telefono":null,"Email":null},"Vehiculo":{"Uso":"PARTICULAR","Marca":"'+this.Marca+'","Modelo":"'+this.Modelo+'","NoMotor":"","NoSerie":"","NoPlacas":"","Descripcion":'+descripcionAseguradora+',"CodMarca":"","CodDescripcion":"","CodUso":"","Clave":'+clave+',"Servicio":"PARTICULAR"},"Coberturas":[],"Paquete":"AMPLIA","Descuento":null,"PeriodicidadDePago":0,"Cotizacion":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"CotID":null,"VerID":null,"CotIncID":null,"VerIncID":null,"Resultado":null},"Emision":{"PrimaTotal":null,"PrimaNeta":null,"Derechos":null,"Impuesto":null,"Recargos":null,"PrimerPago":null,"PagosSubsecuentes":null,"IDCotizacion":null,"Terminal":null,"Documento":null,"Poliza":null,"Resultado":null},"Pago":{"MedioPago":null,"NombreTarjeta":null,"Banco":null,"NoTarjeta":null,"MesExp":null,"AnioExp":null,"CodigoSeguridad":null,"NoClabe":null,"Carrier":0},"CodigoError":null,"urlRedireccion":null}';
          console.log('este sera el url a consultar '+'http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion');
          this.http.get('http://core.alimx.mx/webservice.asmx/CotizacionEmisionJSON?usuario=AhorraSeguros&password=Ah0rraS3guros2017&data='+myJSON+'&movimiento=cotizacion')
          .map(res2=> res2.json().Cotizacion.PrimaTotal)  
          .subscribe(data2=>{
            data2 = data2;
            str = JSON.stringify(data2);
            displayPrimaTotal = str.replace(/"|,|\$/g,'');
            displayPrimaTotalInt=Math.ceil(parseInt(displayPrimaTotal));
            displayPrimaTotal=displayPrimaTotalInt.toLocaleString();
            displayPrimaTotal='$'+displayPrimaTotal;
            console.log("el valor del int es "+displayPrimaTotal);

            
    
            console.log("esta es la response "+displayPrimaTotal+"con la asegturadora "+aseguradora);
            aseguradora=aseguradora.replace(/"/g,'');
            document.getElementById("nombreAuto").innerHTML=this.Marca+' '+this.Modelo;
            document.getElementById("descrAuto").innerHTML=this.Descripcion;
            document.getElementById("subDescrAuto").innerHTML=this.SubDescripcion;
            if(aseguradora==='ABA'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-aba.svg",
                    value: displayPrimaTotal
                });
            }
            if(aseguradora==='ANA'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-ana.svg",
                    value: displayPrimaTotal
                });
            }
            if(aseguradora==='AXA'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-axa.svg",
                    value: displayPrimaTotal
                });
            }  
            if(aseguradora==='BANORTE'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-banorte.svg",
                    value: displayPrimaTotal
                });
            }  
            if(aseguradora==='GMX' && displayPrimaTotal!=="null"){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-gmx.svg",
                    value: displayPrimaTotal
                });
            }                 
            if(aseguradora==='GNP' && displayPrimaTotal!=="null"){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-gnp.svg",
                    value: displayPrimaTotal
                });
            }
            if(aseguradora==='GREAT' && displayPrimaTotal!=="null"){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-great.svg",
                    value: displayPrimaTotal
                });
            }                 
            if(aseguradora==='HDI'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-hdi.svg",
                    value: displayPrimaTotal
                });
            }  
            if(aseguradora==='MAPFRE'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-mapfre.svg",
                    value: displayPrimaTotal
                });
            }              
            if(aseguradora==='QUALITAS'){
                this.comparaList.push({      
                    img: "assets/icon/logo/asegurdoras-qualitas.svg",
                    value: displayPrimaTotal
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
    
        for (let Edad of modelList) {
            alert.addInput({
                 type: 'radio',
                 label: Edad,
                 value: Edad
            });
         }
    
        alert.addButton('Cancel');
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
            mainText: localStorage.getItem("language") == "en"?"MATERIAL DAMAGE:":"DAÑOS MATERIALES: ",
            subText: localStorage.getItem("language") == "en"?"5% V. TRADE":"5% V. COMERCIAL"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"TOTAL THEFT:":"ROBO TOTAL: ",
            subText: localStorage.getItem("language") == "en"?"10% V. COMMERCE":"10% V. COMERCIAL"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"RC PEOPLE:":"RC PERSONAS: ",
            subText: localStorage.getItem("language") == "en"?"3,000,000.0":"3,000,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"RC:":"RC: ",
            subText: localStorage.getItem("language") == "en"?"800,000.0":"800,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"LEGAL DEFENSE:":"DEFENSA LEGAL: ",
            subText: localStorage.getItem("language") == "en"?"AMPARAD":"AMPARADA"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"MEDICAL EXPENSES:":"GASTOS MÉDICOS: ",
            subText: localStorage.getItem("language") == "en"?"50.000.0":"50,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"ROADSIDE ASSISTANCE:":"ASISTENCIA VIAL: ",
            subText: localStorage.getItem("language") == "en"?"AMPARAD":"AMPARADA"
        },
    ];
    private prevPage:any;

    private userName = {name:'Miguel Ivan Hernández'};
    private userEmail = {name:'mivan2021g@gmail.com'};
    private userCellPhoneNumber: any = {name:'5529558232'}; //n
    private userPostalCode = {name:'14390'}; //n
    private userStreetName = {name:'Hda Montecillo'};
    private userOutdoorNumber = {name:'128 b'};
    private userInteriorNumber = {name:'12 a'};

    private userGender = {name:'Male'}; //d
    private userGenderList = ['Male','Female']
    private userDiraction = {name:'Hacienda Montecillo 19'}; //d
    private userDiractionList = ['Hacienda Montecillo 19','Hacienda Montecillo 18','Hacienda Montecillo 17'];
    private userColony = {name:'Villa Coapa'}; //d
    private userColonyList = ['Villa Coapa','Villa Coapa1','Villa Coapa2'];
    private userState = {name:'Ciudad de México'}; //d
    private userStateList = ['Ciudad de México','Ciudad de México1','Ciudad de México2'];
    private userDelegation = {name:'Ciudad de México'}; //d
    private userDelegationList = ['Ciudad de México','Ciudad de México1','Ciudad de México2'];
    private userBrand = {name:'Seleccione la marca'}; //d
    private userModel = {name:'Seleccione el modelo'}; //d
    private userModelList = [];
    private userDescription = {name:'Seleccione la descripcion'}; //d
    private userSubDescription = {name:'Seleccione la sub descripcion'}; //d
    private userDescriptionList = [];
    private userEdad = {name:'Seleccione la edad descripcion'}; //d
    private userEdadList = [18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70];   
    private userDetalleList = [];
    private userSubDescriptionList = [];
    private userSerialNumber = {name:'HEAH876542KLOP'}; //d
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
