import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticProductsDetailsPage } from '../products-details/statistic-products-details';

@Component({
    selector: 'statistic-prices',
    templateUrl: 'statistic-prices.html',
})
export class StatisticPricesPage {

    private optionList:any =[];
    private containerTexts = [
        {
            mainText: localStorage.getItem("language") == "en"?"MATERIAL DAMAGE: ":"DAÑOS MATERIALES: ",
            subText: "5% V. COMERCIAL"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"TOTAL THEFT: ":"ROBO TOTAL: ",
            subText: "10% V. COMERCIAL"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"RC PEOPLE: ":"RC PERSONAS: ",
            subText: "3,000,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"RC: ":"RC: ",
            subText: "800,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"LEGAL DEFENSE: ":"DEFENSA LEGAL: ",
            subText: "AMPARADA"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"MEDICAL EXPENSES: ":"GASTOS MÉDICOS: ",
            subText: "50,000.00"
        },
        {
            mainText: localStorage.getItem("language") == "en"?"ROAD OF ASSISTANCE: ":"ASISTENCIA VIAL: ",
            subText: "AMPARADA"
        },
    ];

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        let data = this.navParams.data;

        this.optionList = [
            {nameOfProduct:localStorage.getItem("language") == "en"?"Car insurance":"Seguro de Auto", subNameOfProduct:"Miguel Ivan Hernandez", companyLogo:"assets/icon/logo/logo-axa.png", companyName:"$12,500", companySubName:localStorage.getItem("language") == "en"?"Full payment":"Pago total", itemValue:"$2,500", itemSubValue: localStorage.getItem("language") == "en"?"Won":"Ganado", productDetails: {mainText: "GNP - Volkswagen Jetta", subText: localStorage.getItem("language") == "en"?"Posted on 15/04/2017":"Enviado el 15/04/2017"}},
            {nameOfProduct:localStorage.getItem("language") == "en"?"Credit card":"Tarjeta de crédito", subNameOfProduct:"Miguel Ivan Hernandez", companyLogo:"assets/icon/logo/logo-axa.png", companyName:"$12,500", companySubName:localStorage.getItem("language") == "en"?"Full payment":"Pago total", itemValue:"$2,500", itemSubValue: localStorage.getItem("language") == "en"?"Won":"Ganado", productDetails: {mainText: "BBVA Bancomer - Premium Blac", subText: localStorage.getItem("language") == "en"?"Posted on 15/04/2017":"Enviado el 15/04/2017"}},
            {nameOfProduct:localStorage.getItem("language") == "en"?"Credit card":"Tarjeta de crédito", subNameOfProduct:"Miguel Ivan Hernandez", companyLogo:"assets/icon/logo/logo-gnp.png", companyName:"$12,500", companySubName: localStorage.getItem("language") == "en"?"Full payment":"Pago total", itemValue:"$2,500", itemSubValue: localStorage.getItem("language") == "en"?"Won":"Ganado", productDetails: {mainText: "BBVA Bancomer - Premium Black", subText: localStorage.getItem("language") == "en"?"Posted on 15/04/2017":"Enviado el 15/04/2017"}}
        ];
    }

    goToStatisticsProductsDetailsPage(){
        this.navCtrl.push(StatisticProductsDetailsPage, {prevPage:"chat"}, {animate: true});
    }
    public search = () => {
    }

    public goBack = () => {
        this.navCtrl.pop();
    }
}
