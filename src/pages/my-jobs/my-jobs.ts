import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { JobDetailsPage } from '../job-details/job-details';
import { StatsPage } from '../stats/stats';

@IonicPage()
@Component({
  selector: 'page-my-jobs',
  templateUrl: 'my-jobs.html',
})
export class MyJobsPage {
  data: any;
  jobs: any;
  myJobs: any = [];
  profile: any;
  appliedJobs: any;
  postedJobs: any;

  constructor(public navCtrl: NavController,public ionEvents: Events, public dataProvider: DataProvider, public navParams: NavParams) {
    this.profile = JSON.parse(localStorage.getItem("user"));
    this.getAllJobs();  
  }

  ionViewDidLoad() { 
    this.getAllJobs();
    this.getMyPostedJobs();
    this.ionEvents.subscribe("user:applied", (res) => {
      this.getAppliedJobs(res);  
    });

  }
 

  mapJobs(jobs, aJobs){
    let list = [];
    if(this.profile.type == "Employee"){
      jobs.forEach(job => {
        aJobs.forEach(aJob => {
          if(job.job_id == aJob.job_id_fk && aJob.user_id_fk == this.profile.user_id){
            list.push(job);
          }
        }); 
      });
      return list;
    }
    else if(this.profile.type == "Employer"){
      jobs.forEach(job => {
        aJobs.forEach(aJob => {
          if(job.job_id == aJob.job_id_fk && aJob.employer_id_fk == this.profile.user_id){
            list.push(job);
          }
        }); 
      });
      return list;
    }

  }

 
  getMyPostedJobs(){
    let list = [];
    this.dataProvider.loadJobs().then(res => {
      this.jobs = res;
      res.forEach(job => {
        if(job.user_id_fk == this.profile.user_id){
          list.push(job);
          console.log(job);
        }
      });
      this.postedJobs = list;
    })
  }


  getAllJobs(){
    this.dataProvider.loadJobs().then(all => {
      this.jobs = all;
      
      this.dataProvider.loadAppliedJobs().then(app => {
        this.appliedJobs = app;
        console.log(app);
        console.log(all);
        this.myJobs = this.mapJobs(all,app);
      })
    })
  }

  getAppliedJobs(res){
    this.dataProvider.loadJobs().then(all => {
      this.jobs = all;
      this.myJobs = this.mapJobs(all, res);
    })
  }
 

  jobDetails(job){
    if(this.profile.type == "Employee"){
      this.navCtrl.push(JobDetailsPage, {job:job});
    }else{
      this.navCtrl.push(StatsPage, {job:job});
    }
  }


}
