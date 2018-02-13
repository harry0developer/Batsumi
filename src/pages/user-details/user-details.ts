import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { UserMoreDetailsPage } from '../user-more-details/user-more-details';
// import * as moment from 'moment';

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
  user: any; //current viewed profile
  page: string;

  raters: any = [];

  feedback: string = '';
  rateState: boolean;
  
  constructor(public navCtrl: NavController, public dataProvider: DataProvider, public ionEvents: Events,
    public modalCtrl: ModalController, public navParams: NavParams) {
      
  }

  ionViewDidLoad() {
    /**
     * 0-20% - 1
     * 21-40% - 2
     * 41-60% - 3
     * 61-80% - 4
     * 81-100% - 5
     */
    this.dataProvider.loadRaters().then(res => {
      this.raters = res;
      console.log(res);
    });

    this.user = this.navParams.get('user');
    this.profile = JSON.parse(localStorage.getItem('user'));
    this.page = this.navParams.get('page');
    this.skills = this.dataProvider.getUserSkills(this.profile);
    this.experience = this.dataProvider.getUserExperience(this.profile);
    this.education = this.dataProvider.getUserEducation(this.profile);

    this.rateState = this.hasRated(this.user);
  }

  loadUserMoreDetails(cat){
    let contactModal = this.modalCtrl.create(UserMoreDetailsPage, {user: this.profile, experience: this.experience, education: this.education, skills: this.skills, category: cat});
    contactModal.present();
  }

  rateUser(user, rate){
    let data = { rater_id: this.profile.user_id, user_id: user.user_id, rate: rate, date_rated: new Date()};
    this.dataProvider.postData(data, "addRater").then(res => {
      let result;
      result = res;
      if(res && result.data){
        this.raters = result.data;
        this.rateState = this.hasRated(this.user);
        
      }else{
        console.log(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  updateRating(user){
    
    let rating_id;
    this.raters.forEach(r => {
      if(r.rater_id == this.profile.user_id && r.user_id == user.user_id){
        rating_id = r.rating_id;
      }
    });
    let data = { rating_id: rating_id, rate: 'negative', date_rated: new Date()};
    this.dataProvider.postData(data, "updateRating").then(res => {
      let result;
      result = res;
      if(res && result.data){
        this.raters = result.data;
        this.rateState = !this.rateState;
        
      }else{
        console.log(res);
      }
    }).catch(err => {
      console.log(err);
    });
  }

  hasRated(user){
    if(this.raters){
      for(var i=0; i<this.raters.length; i++){
        if(this.profile.user_id ==  this.raters[i].rater_id && user.user_id == this.raters[i].user_id){
          this.feedback = this.raters[i].rate;
         return true;
        }
      }
      return false;
    }
    return false;
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
