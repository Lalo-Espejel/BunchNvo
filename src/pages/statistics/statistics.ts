import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticProductsPage } from '../statistics/products/statistic-products';
import { StatisticPricesPage } from '../statistics/prices/statistic-prices';
import { StatisticEarningsPage } from '../statistics/earnings/statistic-earnings';
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
  private polizasCompare:string = 'equal';
  private cotizacionesCompare:string = 'equal';
  private gananciasCompare:string = 'equal';
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
      let actualWeek = _this.getWeek();
      console.log('actualWeek', actualWeek);
      let encodedString = btoa(`IdVend=1&${actualWeek}`);      
      _this.http.get('http://services.bunch.guru/WebService.asmx/ConsultaEstadisticas?param=' + encodedString)
      .map(res=> res.json())
      .subscribe(data=>{        
        _this.ganancias = +data.Ganancias.total;
        _this.cotizaciones = +data.Cotizaciones.total;
        _this.polizas = data.Productos.length;

        let pastWeek = _this.getWeek(-1);
        console.log('pastWeek', pastWeek);
        encodedString = btoa(`IdVend=1&${pastWeek}`);      
        _this.http.get('http://services.bunch.guru/WebService.asmx/ConsultaEstadisticas?param=' + encodedString)
        .map(res=> res.json())
        .subscribe(pastWeekData=>{        
          console.log('pastWeek', pastWeekData);
          let pastWeekPolizas = pastWeekData.Productos.length,
            pastWeekCotizaciones = Number(pastWeekData.Cotizaciones.total),
            pastWeekGanancias = Number(pastWeekData.Ganancias.total);

          if (_this.polizas > pastWeekPolizas) {
            _this.polizasCompare = 'arrow-up';
          } else if (_this.polizas < pastWeekPolizas) {
            _this.polizasCompare = 'arrow-down';
          }

          if (_this.cotizaciones > pastWeekCotizaciones) {
            _this.cotizacionesCompare = 'arrow-up';
          } else if (_this.cotizaciones < pastWeekCotizaciones) {
            _this.cotizacionesCompare = 'arrow-down';
          }

          if (_this.ganancias > pastWeekGanancias) {
            _this.gananciasCompare = 'arrow-up';
          } else if (_this.cotizaciones < pastWeekGanancias) {
            _this.gananciasCompare = 'arrow-down';
          }
        },err =>{
          console.log('error pastWeek');
        });    

      },err =>{
        console.log('error');
      });    
  }

  //Si week=0 entonces devuelve la semana actual, si week=-1 es la semana pasada, week=-2 es semana antepasada, week=2 es dentro de dos semanas and so on
  getWeek(week:number = 0):string {

    let mondayTimestamp = new Date().setDate(new Date().getDate() - (new Date().getDay() - 1)),
      mondayDate = new Date(mondayTimestamp);      

    if (week < 0) {      
      mondayDate = new Date(new Date().setDate(mondayDate.getDate() - 7 * Math.abs(week)));
    } else if (week > 0) {
      mondayDate = new Date(new Date().setDate(mondayDate.getDate() + 7 * week));
    }
        
    let sundayDate = new Date(new Date(mondayDate).setDate(mondayDate.getDate() + 6)),
      start = this.formatDate(mondayDate),
      end = this.formatDate(sundayDate);        

    return `fecIni=${start}&fecFin=${end}`;
  }

  formatDate(date:Date) {
    let day = ((date.getDate() + '').length == 1) ? '0' + date.getDate() : date.getDate(),
      month = ((date.getMonth() + 1 + '').length == 1) ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
      year = date.getFullYear();    
    
      return `${month}/${day}/${year}`;
  }  

  goToStatisticProductsPage(){
    this.navCtrl.push(StatisticProductsPage, {prevPage:"chat"}, {animate: true});
  }

  goToStatisticPricesPage(){
    this.navCtrl.push(StatisticPricesPage, {prevPage:"chat"}, {animate: true});
  }

  goToStatisticEarningsPage(){
    this.navCtrl.push(StatisticEarningsPage, {prevPage:"chat"}, {animate: true});
  }
}
