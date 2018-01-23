import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, Platform } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { Keyboard } from '@ionic-native/keyboard';
import { LoginPage } from '../login/login';
import { LocalizationModel } from '../../_helpers/localizationModel';
import { Http, Headers } from '@angular/http';

import { IonicPage, LoadingController, ToastController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Console } from '@angular/core/src/console';

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
  newuser = {
    email: '',
    password: '',
    displayName: ''
  }
  @ViewChild('prueba2') prueba2 ;
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
              private localizationModal: LocalizationModel,
              public http: Http, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.datePicked = "Tap me"
    this.datePickerNames = this.localizationModal.getDatesNames();

  }
  private codeEnviar:string;
  private cotSeguridadEnviar:string;

  emailUser:any;
  passwordUser:any;
  nombreUser:any;
  apellidoPUser:any;
  apellidoMUser:any;
  generoUser:any;
  fechaUser:any;

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
  getCotSeguridad(code){
    this.http.get('http://services.bunch.guru/WebService.asmx/GetCotSeguridad?param='+code)
    .map(res=> res.json())
    .subscribe(data=>{
      console.log("esta es la response del segundo "+data);
      this.cotSeguridadEnviar=data;
    },err =>{
      console.log(err);
    });
  }
  getCode(){
    console.log("correo"+this.emailUser);
    var code='';
    this.http.get('http://services.bunch.guru/WebService.asmx/CrearCuenta?param='+this.emailUser)
    .map(res=> res.json())
    .subscribe(data=>{
      console.log(data);
      code=data;
      this.getCotSeguridad(code);
      this.codeEnviar=code;
    },err =>{
      console.log(err);
    });
  }
  getUpdateContactoCuenta(){
    var code='';
    //cambiar
    var encodedString = btoa("id="+this.codeEnviar+"&nombre="+this.nombreUser+"&app="+this.apellidoPUser+"&apm="+this.apellidoMUser+"&genero="+this.generoUser+"&FNac="+this.fechaUser);
    console.log("el encoded btoa antes de añadir cod seguridad "+encodedString);
    encodedString = encodedString+this.cotSeguridadEnviar;   
    this.http.get('http://services.bunch.guru/WebService.asmx/UpdateContactoCuenta?param='+encodedString)
    .map(res=> res.json())
    .subscribe(data=>{
      console.log(data);
      code=data;
      this.getCotSeguridad(code);
      this.codeEnviar=code;
    },err =>{
      console.log(err);
    });    
  }
  getUpdateContasenaCuenta(){
    console.log('password',this.passwordUser);
    var newCode='';
    var encodedString = btoa("id="+this.codeEnviar+"&password="+this.passwordUser);
    console.log("el encoded btoa antes de añadir cod seguridad "+encodedString);
    var encodedString = encodedString+this.cotSeguridadEnviar;
    console.log("el encoded btoa despues "+encodedString);
    this.http.get('http://services.bunch.guru/WebService.asmx/UpdateContasenaCuenta?param1='+encodedString)
    .map(res=> res.json())
    .subscribe(data=>{
      console.log(data);
    },err =>{
      console.log(err);
    });
  }    
  updateNombre(){
    console.log("nombre"+this.nombreUser+"   paterno"+this.apellidoPUser+"   materno"+this.apellidoMUser+"   genero"+this.generoUser+"   fechanac"+this.fechaUser);
    
  }
  public nextSlide = () => {
    if (this.slides.getActiveIndex()===0){
      this.getCode();
    } 
    if (this.slides.getActiveIndex()===1){
      console.log("se ha mandado a llamar el terce método");
      this.getUpdateContasenaCuenta();
    }
    if (this.slides.getActiveIndex()===4){
      var d = new Date(this.fechaUser);
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1;
      var curr_year = d.getFullYear();
      this.fechaUser=curr_date + "/" + curr_month + "/" + curr_year;
      console.log("esta es la fecha "+this.fechaUser);
  
      this.getUpdateContactoCuenta();
      this.signup();
    }                   
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
      this.female = false;
      this.generoUser="MASCULINO";
    } else {
      this.female = true;
      this.male = false;
      this.generoUser="FEMENINO";
    }
  }
  
  /*
  public launchPicker = () => {
     console.log('2212');
     this.dPicker.show({
       mode: 'date',
       androidTheme: this.dPicker.ANDROID_THEMES.THEME_HOLO_DARK,
       date: new Date(),
       okText: "Aceptar",
       cancelText: "Cancelar"
     }).then(
       date =>{
         let aux = "";
         if(date.getMonth() < 10){
           aux = `0${date.getMonth()}`;
         } else {
           aux = `${date.getMonth()}`;
         }
         this.datePicked= `${date.getDate()}/${aux}/${date.getFullYear()}`;
       },
       err => console.log('Error occurred while getting date: ', err))
   }
   */
  public goHome = () => {
    this.navCtrl.setRoot(LoginPage, false, {animate: true});
  }
  public goBack(){
    this.navCtrl.setRoot(LoginPage);
    this.navCtrl.popToRoot();
  }

  signup() {
    this.newuser.displayName=this.nombreUser+' '+this.apellidoPUser+' '+this.apellidoMUser;
    console.log("su nuevo alias sera: "+this.newuser.displayName);
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '') {
      toaster.setMessage('Se necesita llenar todos los campos');
      toaster.present();
    }
    else if (this.newuser.password.length < 7) {
      toaster.setMessage('El password deberá de ser de 6 caracteres');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'Actualizando'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success)
          console.log("se ha creado una nueva cuenta");
        else
          alert('Error' + res);
      })
    }
  }    
}
