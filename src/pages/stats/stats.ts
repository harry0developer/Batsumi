import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  job: any;
  appliedUsers: any = [];
  appliedJobs: any;
  profile: any;
  myJobs: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }
  
  ionViewDidLoad() {
    this.job = this.navParams.get('job');
    this.profile = JSON.parse(localStorage.getItem('user'));
    console.log('ionViewDidLoad StatsPage');
    this.getUsersApplied();
  }

  getUsersApplied(){
    console.log("Getting applied users");
    
    this.dataProvider.loadAppliedJobs().then(res => {
      this.appliedJobs = res;
      this.appliedUsers = [];
      let list = [];
      res.map(job => {
        if(job.employer_id_fk == this.profile.user_id){
           this.mapUsersByJobs(job);
        }
      }) 
    })
  }
  
  mapUsersByJobs(job){
    let list = [];
    this.dataProvider.loadUsers().then(users => {
      users.forEach(user => {
        if(user.user_id == job.user_id_fk && this.profile.user_id == job.employer_id_fk){
          this.appliedUsers.push(user);
        }
      });
    });
    
  }

}
