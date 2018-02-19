import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events} from 'ionic-angular';
import * as moment from 'moment';
import { DataProvider } from '../../providers/data/data';


@IonicPage()
@Component({
  selector: 'page-job-details',
  templateUrl: 'job-details.html',
})
export class JobDetailsPage {
  job: any;
  user: any; 
  post_time: string;
  profile: any;
  jobs: any;
  jobsApplied: any;
  applied: boolean
  constructor(public navCtrl: NavController, public ionEvent: Events, public dataProvider: DataProvider, public navParams: NavParams) { 
    this.profile = JSON.parse(localStorage.getItem("user"));
    this.applied = false;
     
  }
    
  ionViewDidLoad(){
    
    this.job = this.navParams.get('job');
    this.user = this.navParams.get('user');
    this.hasApplied();
    this.post_time = moment(this.job.date_created, "YYYYMMDD").fromNow();  
  }


  applyNow(job, emp){
    let data = {
      user_id_fk: this.profile.user_id,
      job_id_fk: job.job_id, 
      employer_id_fk: job.user_id_fk,
      date_applied: new Date()
    }
    this.dataProvider.postData(data, 'addJobToApplicants').then(res => {
      let results;
      results = res;
      if(results && results.data){
        this.dataProvider.appliedJobs = null;
        this.ionEvent.publish("user:applied", results.data);
        this.hasApplied();
        console.log(res);
      }else{
        console.log(res);
      }
    }).catch(err => {
      console.log(err);
    })
  }


  deleteApplication(job){
    let data = { 
      user_id_fk: this.profile.user_id,
      employer_id_fk: job.user_id_fk,
      job_id_fk: job.job_id
    }
    console.log(data);
  }
  

  withdrawApplication(job){
    let data = { 
      user_id_fk: this.profile.user_id,
      employer_id_fk: job.user_id_fk,
      job_id_fk: job.job_id
    }
    this.dataProvider.postData(data, 'removeJobFromApplicants').then(res => {
      let results;
      results = res;
      if(results && results.data){
        this.dataProvider.appliedJobs = null;
        this.ionEvent.publish("user:applied", results.data);
        console.log(res);
        this.applied = !this.applied;
      } 
      else{ 
          console.log(res);
      }
    }).catch(err => {
      console.log(err);
    })
  }

  getSkills(skills){
    return skills.split(",");
  }

 
  hasApplied(){ 
    this.dataProvider.loadAppliedJobs().then(res => {
      console.log(this.job);
      this.jobsApplied = res;
      res.forEach(aJob => {
        if(aJob.job_id_fk == this.job.job_id && this.profile.user_id == aJob.user_id_fk){
          this.applied = true;
          console.log("You applied for "+ this.job.title);
        }
      });
    });
  }
 
}
