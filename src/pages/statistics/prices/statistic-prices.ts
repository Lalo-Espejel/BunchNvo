import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StatisticProductsDetailsPage } from '../products-details/statistic-products-details';

import { Chart } from 'chart.js';

@Component({
    selector: 'statistic-prices',
    templateUrl: 'statistic-prices.html',
})
export class StatisticPricesPage {
    @ViewChild('barCanvas') barCanvas;
    @ViewChild('doughnutCanvas') doughnutCanvas;
    @ViewChild('lineCanvas') lineCanvas;
 
    barChart: any;
    doughnutChart: any;
    lineChart: any;

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
    ionViewDidLoad() {        
 
        this.lineChart = new Chart(this.lineCanvas.nativeElement, {
 
            type: 'line',            
            data: {
                labels: ["1", "2", "3", "4", "5", "6", "7"],
                datasets: [
                    {
                        label: "", //My First dataset
                        fill: "start",
                        lineTension: 0.5,
                        backgroundColor: "rgba(77,186,192,1)", //rgba(75,192,192,0.4)
                        borderColor: "rgba(77,186,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(77,186,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 0, //1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(77,186,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 0, //1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,                        
                    }
                ]
            },
            options: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        fontSize: 0,
                    }
                },
                elements: { point: { radius: 0 } },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                //display: false
                                //beginAtZero: true,
                                //min: 0,
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                display: false
                            },
                            gridLines: {
                                display: false,
                                drawBorder: false,
                            }
                        }
                    ] //, {gridLines: {display: false}}
                },                
                tooltips: {
                    displayColors: false,
                }
            }
 
        });

    }
}
