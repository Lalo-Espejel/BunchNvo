import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../login/login';
import { LocalizationModel } from '../../_helpers/localizationModel'
/**
 * Generated class for the RegistrerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-registrer',
  templateUrl: 'registrer.html',
  providers: [Keyboard],
  
})
export class RegistrerPage {

  @ViewChild('slides') slides: Slides;
  @ViewChild('name') nameHTML: any;

  datePickerNames:any;

  public datePicked: string ;

  public currentStep: number = 1;
  public maxSlides: number = 4;

  public male: boolean = true;
  public female: boolean = false;
  public selections =  [
        { title: localStorage.getItem("language") == "en"?"Male":"Hombre", checked: false, index: 0 },
        { title: localStorage.getItem("language") == "en"?"Femail":"Mujer", checked: false, index: 1 }
    ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dPicker: DatePicker,
              private kBoard: Keyboard,
              private platform: Platform,
              private localizationModal: LocalizationModel) {

    this.datePicked = "Tap me"
    this.datePickerNames = this.localizationModal.getDatesNames();

  }

  ionViewDidLoad() {
     //console.log('number of slides' ,this.slides.length());
    console.log('ionViewDidLoad RegistrerPage');     
    this.slides.lockSwipes(true);
    this.slides.onlyExternal = true;   
  }
  ionViewDidEnter(){
    this.platform.ready().then(() => {
        this.kBoard.disableScroll(true); 
        this.kBoard.hideKeyboardAccessoryBar(true);
    });
  }
  ionViewWillLeave() {
    this.platform.ready().then(() => {
      this.kBoard.disableScroll(false);
     
    });
  }


  public nextSlide = () => {
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext(300);
    this.currentStep += 1;
  }

  public previousSlide = () => {
    if (this.slides.getActiveIndex()===0){
      this.goHome();
    }
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev(300);
    this.currentStep -= 1;
  }

  public updateCheckbox = (sel, items) => {
    items.forEach((element, index) => {
      console.log('item ', element);
      if(sel != index){
         element.checked = false;
      }
    });
  }
  chnageGenderPick(value){
    if(value == "male") {
      this.male = true;
      this.female = false
    } else {
      this.female = true;
      this.male = false;
    }
  }

  // public launchPicker = () => {
  //   console.log('2212');
  //   this.dPicker.show({
  //     mode: 'date',
  //     androidTheme: this.dPicker.ANDROID_THEMES.THEME_HOLO_DARK,
  //     date: new Date(),
  //     okText: "Aceptar",
  //     cancelText: "Cancelar"
  //   }).then(
  //     date =>{
  //       let aux = "";
  //       if(date.getMonth() < 10){
  //         aux = `0${date.getMonth()}`;
  //       } else {
  //         aux = `${date.getMonth()}`;
  //       }
  //       this.datePicked= `${date.getDate()}/${aux}/${date.getFullYear()}`;
  //     },
  //     err => console.log('Error occurred while getting date: ', err))
  // }

  public goHome = () => {
    this.navCtrl.setRoot(LoginPage, false, {animate: true});
  }
  public goBack(){
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }
}
