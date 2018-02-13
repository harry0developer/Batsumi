import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';

import { SignupPage } from '../signup/signup';
// import { JobsPage } from '../jobs/jobs';
import { HomePage } from '../home/home';

import { DataProvider } from '../../providers/data/data';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  data: any = {email: "", password:""}; 
  profile: any;
  constructor(public navCtrl: NavController, public dataProvider:DataProvider, public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.dataProvider.presentLoading("Logging in...");
    this.profile = JSON.parse(localStorage.getItem('user'));
    if(this.profile != null){
      this.dataProvider.dismissLoading();
      localStorage.setItem('user', JSON.stringify(this.profile));
      this.navCtrl.setRoot(HomePage);
    }else{
      this.dataProvider.dismissLoading();
    }
  }


  login(){
    this.dataProvider.presentLoading("Logging in...");
    let res; 
    // this.data = {email:"harry@test.com", password: "123456"};
    console.log(this.data);
 
    this.dataProvider.postData(this.data,'login').then((result) => {
      res = result;
      if(res && res.error){
        this.dataProvider.dismissLoading();
        this.dataProvider.presentAlert("Login Failed", "Email and Password do not match");
      }else{
        this.dataProvider.dismissLoading();
        console.log(res.data);
        localStorage.setItem('user', JSON.stringify(res.data));
        this.navCtrl.setRoot(HomePage, {user: res.data});
      }
    }).catch(err => {
      console.log(err);
      this.dataProvider.dismissLoading();
    })
  }
  

  signup(){ 
    let loginModal = this.modalCtrl.create(SignupPage);
    loginModal.onDidDismiss(data => {
      console.log(data);
    });
    loginModal.present();
  }

}
