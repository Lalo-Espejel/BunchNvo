import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
// import { AcquireProductPage } from '../acquire-product/acquire-product';

@Component({
    selector: 'statistic-products-details-page',
    templateUrl: 'statistic-products-details.html',
})
export class StatisticProductsDetailsPage {

    private isClient: any;
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

    constructor(public navCtrl: NavController, public navParams: NavParams) {

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
    public goBack = () => {
        this.navCtrl.pop();
    }
}
