import { Component } from '@angular/core';
import { Platform, Events, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { IntroductionPage } from './../pages/introduction/introduction';
import { HomePage } from '../pages/home/home';
import { LocalizationModel } from '../_helpers/localizationModel';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = IntroductionPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private app: App,
              private events: Events,
              public localizationModel: LocalizationModel) {
    
    platform.ready().then(() => {

      this.events.subscribe('user:logout', () => {
        this.app.getRootNav().setRoot(LoginPage, null, { animate: true });
      });

      this.events.subscribe('user:homePage', ()=> { this.app.getRootNav().setRoot(HomePage, {openProduct:true}, {animate:true})});
      this.localizationModel.setDefaultLanguage();

      statusBar.styleDefault();
    });
  }
}

