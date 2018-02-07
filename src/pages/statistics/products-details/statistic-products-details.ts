import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
// import { AcquireProductPage } from '../acquire-product/acquire-product';

@Component({
    selector: 'statistic-products-details-page',
    templateUrl: 'statistic-products-details.html',
})
export class StatisticProductsDetailsPage {

    private isClient: any;
    private productDetail:any = {};    
    private optionList:any =[];
    private containerTexts = [
        {
            mainText: "DAÑOS MATERIALES: ",
            subText: "5% V. COMERCIAL"
        },
        {
            mainText: "ROBO TOTAL: ",
            subText: "10% V. COMERCIAL"
        },
        {
            mainText: "RC PERSONAS: ",
            subText: "3,000,000.00"
        },
        {
            mainText: "RC: ",
            subText: "800,000.00"
        },
        {
            mainText: "DEFENSA LEGAL: ",
            subText: "AMPARADA"
        },
        {
            mainText: "GASTOS MÉDICOS: ",
            subText: "50,000.00"
        },
        {
            mainText: "ASISTENCIA VIAL: ",
            subText: "AMPARADA"
        },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {

        this.isClient = localStorage.getItem("isClient");
        let data = this.navParams.data;
        this.optionList = [
            {nameOfProduct:"Chevrolet Aveo 2010", subNameOfProduct:"Seguro de Auto", companyLogo:"assets/icon/logo/logo-axa.png", companyName:"Amplia", companySubName:"Covertura", itemValue:"$6,050", itemSubValue:"Anual", conteinerTexts:[
                {
                    mainText: "DAÑOS MATERIALES: ",
                    subText: "5% V. COMERCIAL"
                },
                {
                    mainText: "ROBO TOTAL: ",
                    subText: "10% V. COMERCIAL"
                },
                {
                    mainText: "RC PERSONAS: ",
                    subText: "3,000,000.00"
                },
                {
                    mainText: "RC: ",
                    subText: "800,000.00"
                },
                {
                    mainText: "DEFENSA LEGAL: ",
                    subText: "AMPARADA"
                },
                {
                    mainText: "GASTOS MÉDICOS: ",
                    subText: "50,000.00"
                },
                {
                    mainText: "ASISTENCIA VIAL: ",
                    subText: "AMPARADA"
                },
            ]},
            {nameOfProduct:"Nissan Tsuru 2010", subNameOfProduct:"Seguro de Auto", companyLogo:"assets/icon/logo/logo-axa.png", companyName:"Amplia", companySubName:"Covertura", itemValue:"$8,940", itemSubValue:"Anual", conteinerTexts:[
                {
                    mainText: "DAÑOS MATERIALES: ",
                    subText: "5% V. COMERCIAL"
                },
                {
                    mainText: "ROBO TOTAL: ",
                    subText: "10% V. COMERCIAL"
                },
                {
                    mainText: "RC PERSONAS: ",
                    subText: "3,000,000.00"
                },
                {
                    mainText: "RC: ",
                    subText: "800,000.00"
                },
                {
                    mainText: "DEFENSA LEGAL: ",
                    subText: "AMPARADA"
                },
                {
                    mainText: "GASTOS MÉDICOS: ",
                    subText: "50,000.00"
                },
                {
                    mainText: "ASISTENCIA VIAL: ",
                    subText: "AMPARADA"
                },
            ]}
        ];
    }

    goToAcquireProduct(){
        // this.navCtrl.push(AcquireProductPage, {prevPage:"chat"}, {animate: true});
    }

    ionViewDidLoad(){              
        var t = this;
        var encodedString = btoa("IdVend=1&fecIni=01/01/2017&fecFin=01/01/2019");      
        this.http.get('http://services.bunch.guru/WebService.asmx/ConsultaEstadisticas?param=' + encodedString)
        .map(res=> res.json())
        .subscribe(data=>{                  
            data.Productos.forEach(function(e) {
                console.log(e);

                e.aseguradora = 'ABA'; //for test purposes                

                t.productDetail.seguro = e.ramo;
                t.productDetail.aseguradora = e.aseguradora;
                t.productDetail.policy = e.poliza;
                t.productDetail.description = e.descripcion;
                t.productDetail.fInicio = e.fInicio;
                t.productDetail.fFin = e.fFin;
                t.productDetail.primaTotal = e.total;
                t.productDetail.periodicidad = e.Periodicidad;

                /*t.optionList.push({
                    nameOfProduct: e.ramo, 
                    subNameOfProduct: e.cliente, 
                    companyLogo: "assets/icon/logo/logo-" + e.aseguradora + ".png", 
                    companyName: e.ganancia, 
                    companySubName: e.Periodicidad, 
                    itemValue: e.total, 
                    itemSubValue: e.Periodicidad, 
                    productDetails: {
                        mainText: e.descripcion, 
                        subText: "Vigencia " + e.fInicio + " al " + e.fFin,
                        policyNumber: "No. de  Póliza " + e.poliza
                    }
                });*/
            });
        },err =>{
          console.log('error');
        });    
    }

    public goBack = () => {
        this.navCtrl.pop();
    }
}
