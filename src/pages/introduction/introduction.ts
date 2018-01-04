import { Storage } from '@ionic/storage';
import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalizationModel } from '../../_helpers/localizationModel';



/**
 * Generated class for the IntroductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public platform: Platform,
              public splashScreen: SplashScreen,
              private localizationModal: LocalizationModel,
              public alertCtrl: AlertController,
              private storage: Storage) {
      this.setAppLanguage();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPag');
    this.storage.get('name').then((val) => {
      console.log('Your age is', val);
    });  
  }

  ionViewWillEnter(){
    this.platform.ready().then(() => {
      setTimeout(()=>{
        this.splashScreen.hide();
      }, 500);
    });
  }
  setAppLanguage(){
    (localStorage.getItem("language")=='en' || localStorage.getItem("language")=='sp') && localStorage.getItem("languageWasChousen") == "true"? "":this.presentLanguagePopup();
  }

  presentLanguagePopup(){
    let prompt = this.alertCtrl.create({
      title: 'Welcome',
      message: 'Chouse languge for app',
      inputs : [
        {
          type:'radio',
          label:'English',
          value: 'en'
        },
        {
          type:'radio',
          label:'Español',
          value: 'sp',
        }

      ],
      buttons : [
        {
          text: "Chose",
          handler: data => {
            this.localizationModal.changeLanguage(data);
          }
        }
      ]
    });
    prompt.present();
  }

  goHome = () => {
    localStorage.setItem("isClient","false");
    localStorage.setItem("isFirstEnterToHomeScreeb","true");
    this.navCtrl.push(HomePage, null, {animate: true});
  }

}
