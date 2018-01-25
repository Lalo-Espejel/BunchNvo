import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticProductsPage } from '../statistics/products/statistic-products';
import { StatisticPricesPage } from '../statistics/prices/statistic-prices';
import { Http, Headers } from '@angular/http';

/**
 * Generated class for the StatisticsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-statistics',
  templateUrl: 'statistics.html',
})
export class StatisticsPage {
  ganancias:number;
  cotizaciones:number;
  polizas:number;
  private optionList:any;
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
  private dateLeftItemList = [];
  private dateRightItemList = [];
  private firstValue ="1";
  private secondValue ="15";
  private priceValue: any = "$5,240";
  private compareValues: any;
  private botScale = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
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
    for(let i = 1; i < 31; i++){
      this.dateLeftItemList.push({ monthName:"Abril ", day: i});
      this.dateRightItemList.push({ monthName:"Abril ", day: i});
    }
  }

  ionViewDidLoad(){      
      var _this = this;      
      var encodedString = btoa('IdVend=150');      
      _this.http.get('http://services.bunch.guru/WebService.asmx/ConsultaEstadisticas?param=' + encodedString)
      .map(res=> res.json())
      .subscribe(data=>{        
        _this.ganancias = data.Ganancias.total;
        _this.cotizaciones = data.Cotizaciones.total;
        _this.polizas = data.Productos.length;
      },err =>{
        console.log('error');
      });    
  }

  goToStatisticProductsPage(){
    this.navCtrl.push(StatisticProductsPage, {prevPage:"chat"}, {animate: true});
  }

  goToStatisticPricesPage(){
    this.navCtrl.push(StatisticPricesPage, {prevPage:"chat"}, {animate: true});
  }

}
