import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams, ModalController } from 'ionic-angular';
import { OtpPage} from '../otp/otp';
import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  data: any = {};
  constructor(public navCtrl: NavController, public dataProvider:DataProvider, public viewCtrl: ViewController, public modalCtrl: ModalController, public navParams: NavParams) {
    this.data = { email: "", password: "", otp:""};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  openOTPPage(){ 
    let signupModal = this.modalCtrl.create(OtpPage, {data: this.data});
    signupModal.onDidDismiss(data => {
      console.log(data);
    });
    signupModal.present();
  }

  sendOTP(){
    this.dataProvider.presentLoading("Please wait...");
    let res; 
    // this.data = {email:"harry@test.com", password: "123456"};
    this.dataProvider.postData(this.data,'sendOTP').then((result) => {
      res = result;
      if(res && res.error){
        console.log(res.error);
        this.dataProvider.dismissLoading();
        this.dataProvider.presentAlert("Signup Failed", res.error);
      }else{ 
        this.data.otp = res.data;
        this.openOTPPage();
        console.log(res);
        this.dataProvider.dismissLoading();
      }
    }).catch(err => {
      console.log(err);
      this.dataProvider.dismissLoading();
    })
  }
  
}
