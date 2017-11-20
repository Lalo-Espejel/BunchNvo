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
    public userBrandList =  ['Elegible','Elegible1','Elegible2'];

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
            //this.getDetalle();
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
    private comparaList = [
    {
        img: "assets/icon/logo/logo-aba.png",
        value: "$5,499"
    },
    {
        img: "assets/icon/logo/logo-axa.png",
        value: "$5,499"
    },
    {
        img: "assets/icon/logo/logo-gnp.png",
        value: "$5,499"
    },
    {
        img: "assets/icon/logo/logo-mapfre.png",
        value: "$5,499"
    },
    {
        img: "assets/icon/logo/logo-qualitas.png",
        value: "$5,499"
    }
];
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
    private userBrand = {name:'Elegible'}; //d
    private userModel = {name:'2015'}; //d
    private userModelList = [];
    private userDescription = {name:'Jetta'}; //d
    private userDescriptionList = [];
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
