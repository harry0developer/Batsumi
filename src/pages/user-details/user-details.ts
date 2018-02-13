import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { UserMoreDetailsPage } from '../user-more-details/user-more-details';
import * as moment from 'moment';

 import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-user-details',
  templateUrl: 'user-details.html',
})
export class UserDetailsPage {
    
  data:any = [];
  personal: any;
  education: any;
  experience: any;
  skills: any;
  hobbies: any;
  profile: any; //me
  page: string;
  
  constructor(public navCtrl: NavController, public dataProvider: DataProvider, public ionEvents: Events,
    public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.profile = this.navParams.get('user');
    this.page = this.navParams.get('page');
    this.skills = this.dataProvider.getUserSkills(this.profile);
    this.experience = this.dataProvider.getUserExperience(this.profile);
    this.education = this.dataProvider.getUserEducation(this.profile);
  }

  loadUserMoreDetails(cat){
    let contactModal = this.modalCtrl.create(UserMoreDetailsPage, {user: this.profile, experience: this.experience, education: this.education, skills: this.skills, category: cat});
    contactModal.present();
  }

  onModelChange($event){
    console.log($event)
  }

 
  offerUserEmployment(user){
    this.dataProvider.presentLoading("Please wait...");
    let data = { 
      appointer_id: this.profile.user_id, 
      appointed_id: user.user_id,
      status: "Job Offered", //"Job Rejected" , "Job Accepted"
      last_update: new Date()
    }
    this.dataProvider.postData(data, 'addToAppointments').then(res => {
      let result
      result = res;
      if(result && result.data){
        this.dataProvider.dismissLoading();
        this.ionEvents.publish("appointments:updated", result.data);
      }else{
        this.dataProvider.dismissLoading();
        this.dataProvider.presentAlert("Job offer Failed", result.error);
      }
    }).catch(err => {
      console.log(err);
    })

  }

}
