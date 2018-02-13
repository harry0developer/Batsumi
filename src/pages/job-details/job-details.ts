import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';


@IonicPage()
@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {
  job: any;
  user: any; 
  post_time: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) { }
    
  ionViewDidLoad(){
    this.job = this.navParams.get('job');
    this.user = this.navParams.get('user');
    console.log(this.user);
    console.log(this.job);
    this.post_time = moment(this.job.date_created, "YYYYMMDD").fromNow();  
  }

  applyNow(job){
    console.log(job);
  }

  getSkills(skills){
    return skills.split(",");
  }

 
}
