import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { JobDetailsPage } from '../job-details/job-details';

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

  constructor(public navCtrl: NavController,public ionEvents: Events, public dataProvider: DataProvider, public navParams: NavParams) {
    this.profile = JSON.parse(localStorage.getItem("user"));
    this.getAllJobs();  
  }

  ionViewDidLoad() { 
    this.getAllJobs();

    this.ionEvents.subscribe("user:applied", (res) => {
      this.getAppliedJobs(res);  
    });

  }
 

  mapJobs(jobs, aJobs){
    let list = [];
    jobs.forEach(job => {
      aJobs.forEach(aJob => {
        if(job.job_id == aJob.job_id_fk){
          list.push(job);
        }
      }); 
    });
    return list;
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
    this.navCtrl.push(JobDetailsPage, {job:job});
  }


}
