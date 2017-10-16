import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import {PaymentSubmittedPage} from "../payment-submited/payment-submited";
import { DocumentDetailPage } from '../acquire-product/document-details/document-detail';
import { PayPolicyPage } from '../acquire-product/pay-policy/pay-policy';
import { ProductsPage } from '../products/products';
import { ClienteProductDetailPage } from '../client-mode/cliente-product-detail/cliente-product-detail';
import { AlertService } from '../../_helpers/alert.service'
import { LocalizationModel } from '../../_helpers/localizationModel'

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
    private userBrandList =  ['Elegible','Elegible1','Elegible2'];
    private userModel = {name:'2015'}; //d
    private userModelList = ['2015','2014','2013'];
    private userDescription = {name:'Jetta'}; //d
    private userDescriptionList = ['Jetta','Jetta1','Jetta2'];
    private userSerialNumber = {name:'HEAH876542KLOP'}; //d
    private userSerialNumberList = ['HEAH876542KLOP','HEAH87LOP','HEKLOP'];
    private userPlates = {name:'HEM987'}; //d
    private userPlatesList = ['HEM987','HEM9','HE87'];


    constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertSrv: AlertService, private localizationModal: LocalizationModel) {
        this.prevPage = this.navParams.get("prevPage");
        this.isClient = localStorage.getItem("isClient");
        this.prevPage == "chat"? this.topTab ="Compara" : this.isClient=="true"?this.topTab ="Producto":this.topTab ="Cliente";
        this.datePickerNames = this.localizationModal.getDatesNames();
    }

    showAlert( value, mode, modelList = [], massage=""){
        this.alertSrv.showAlert(value, mode, modelList, massage);
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
