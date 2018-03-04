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
  stats: string = "views";
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider) {
  }
  
  ionViewDidLoad() {
    this.job = this.navParams.get('job');
    this.profile = JSON.parse(localStorage.getItem('user'));
    this.mapUsersByJobs();
  }
 
  
  mapUsersByJobs(){
    let list = []; 
    this.dataProvider.loadUsers().then(users => {
      users.forEach(user => {
        this.job.viewedUsers.forEach(vUser => {
          if(user.user_id == vUser.user_id_fk){  
            list.push(user);
          } 
        });
      });
      this.job.viewedUsers = list;    
    });
  }

}
