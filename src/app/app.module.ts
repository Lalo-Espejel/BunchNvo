import { GetMarcasPage } from './../pages/get-marcas/get-marcas';
import { GetModelosPage } from './../pages/get-modelos/get-modelos';
import { GetBuscarPage } from './../pages/get-buscar/get-buscar';
import { GetDescripcionPage } from './../pages/get-descripcion/get-descripcion';
import { GetSubDescripcionPage } from './../pages/get-sub-descripcion/get-sub-descripcion';
import { GetDetallePage } from './../pages/get-detalle/get-detalle';
import { CarListPage } from './../pages/car-list/car-list';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DatePicker } from '@ionic-native/date-picker';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { IntroductionPage } from '../pages/introduction/introduction';
import { RecoveryPage } from '../pages/recovery/recovery';
import { RegistrerPage } from '../pages/registrer/registrer';
import { StatisticsPage } from './../pages/statistics/statistics';
import { StatisticProductsPage } from './../pages/statistics/products/statistic-products';
import { StatisticProductsDetailsPage } from './../pages/statistics/products-details/statistic-products-details';
import { ProductsPage } from '../pages/products/products';
import { AdvertisementPage } from './../pages/advertisement/advertisement';
import { NotificationPage } from './../pages/notification/notification';
import { TextingPage } from './../pages/texting/texting';
import { ProfilePage } from './../pages/profile/profile';
import { NotificationDetailPage } from './../pages/notification-detail/notification-detail';
import { NewAdvertisementPage } from './../pages/new-advertisement/new-advertisement';
import { CreateAdvertisementPage } from './../pages/create-advertisement/create-advertisement';
import { ConfigAdvertisementPage } from './../pages/config-advertisement/config-advertisement';
import { ChatPage } from './../pages/chat/chat';
import { PurchasePage } from './../pages/purchase/purchase';
import { AdDetailPage } from './../pages/ad-detail/ad-detail';
import { FilterPage } from './../pages/filter-page/filter-page';
import { AcquireProductPage } from '../pages/acquire-product/acquire-product';
import { DocumentDetailPage } from '../pages/acquire-product/document-details/document-detail';
import { PayPolicyPage } from '../pages/acquire-product/pay-policy/pay-policy';
import { PaymentSubmittedPage } from '../pages/payment-submited/payment-submited';
import { HelpCenterPage} from '../pages/help-center/help-center';
import { ClienteProductDetailPage } from '../pages/client-mode/cliente-product-detail/cliente-product-detail';


import { Localstorage } from './../_helpers/localstorage.controller';
import { Constants } from './../_helpers/constants.controller';

import {AlertService} from './../_helpers/alert.service'
import {LocalizationModel} from './../_helpers/localizationModel'
import {TranslateModule, TranslateLoader} from "@ngx-translate/core";
import {Http} from "@angular/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";





@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    CarListPage,
    GetMarcasPage,
    GetModelosPage,
    GetBuscarPage,
    GetDescripcionPage,
    GetSubDescripcionPage,
    GetDetallePage,
    IntroductionPage,
    RecoveryPage,
    RegistrerPage,
    ProductsPage,
    AdvertisementPage,
    NotificationPage,
    TextingPage,
    ProfilePage,
    StatisticsPage,
    StatisticProductsPage,
    StatisticProductsDetailsPage,
    NotificationDetailPage,
    NewAdvertisementPage,
    FilterPage,
    CreateAdvertisementPage,
    ConfigAdvertisementPage,
    ChatPage,
    PurchasePage,
    AdDetailPage,
    AcquireProductPage,
    PaymentSubmittedPage,
    HelpCenterPage,
    ClienteProductDetailPage,
    DocumentDetailPage,
    PayPolicyPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp ,{ scrollAssist: false, autoFocusAssist: false } ),
    IonicStorageModule.forRoot(),
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [Http]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    CarListPage,
    GetMarcasPage,
    GetModelosPage,
    GetBuscarPage,
    GetDescripcionPage,
    GetSubDescripcionPage,
    GetDetallePage,
    IntroductionPage,
    RecoveryPage,
    RegistrerPage,
    ProductsPage,
    AdvertisementPage,
    NotificationPage,
    TextingPage,
    ProfilePage,
    StatisticsPage,
    StatisticProductsPage,
    StatisticProductsDetailsPage,
    NotificationDetailPage,
    FilterPage,
    NewAdvertisementPage,
    CreateAdvertisementPage,
    ConfigAdvertisementPage,
    ChatPage,
    PurchasePage,
    AdDetailPage,
    AcquireProductPage,
    PaymentSubmittedPage,
    HelpCenterPage,
    ClienteProductDetailPage,
    DocumentDetailPage,
    PayPolicyPage,
  ],
  providers: [
    Constants,
    Localstorage,
    LocalizationModel,
    AlertService,
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

  ]
})
export class AppModule {}
export function createTranslateLoader(http: Http) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}