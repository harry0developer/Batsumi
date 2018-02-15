import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { JobDetailsPage } from '../job-details/job-details';

@IonicPage()
@Component({
  selector: 'page-jobs',
  templateUrl: 'jobs.html',
})
export class JobsPage {
  data: any;
  jobs: any;
  myJobs: any = [];
  profile: any;
  constructor(public navCtrl: NavController, public dataProvider: DataProvider, public navParams: NavParams) {
    this.profile = JSON.parse(localStorage.getItem("user"));
  }

  ionViewDidLoad() { 
    this.getJobs();
    this.loadMyJobs();
  }
  
  loadMyJobs(){
    let aJobs = [];
    if(this.profile.type == "Employer"){
      this.jobs.forEach(job => {
        if(job.user_id_fk == this.profile.user_id){
          this.myJobs.push(job);
        }
      });
    }else{
      this.dataProvider.loadAppliedJobs().then(res => {
        res.map(res => {
          this.jobs.map(job => {
            if(job.job_id == res.job_id_fk){
              this.myJobs.push(job);
            }
          })
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }

  postJob(){
    this.dataProvider.presentLoading("Please wait...");
    let res;  
    this.data = {title:"Plumber urgently", type:"Part-time", tagline:"Our bathroom is leaking, please help!", 
    category: "Plumbing", description:"A professional plumber is needed asap and we pay good money. All the bathrooms need rework", 
    offer:"400 p/d", date_created:"2018-01-18", email:"hanni@test.com", phone:"0823340000", address:"Plain str, Wettown, Cape Town", user_id: 2};
    this.dataProvider.postData(this.data, "addJob").then((result) => {
      console.log(result);
      res = result;
      if(res && res.error){
        console.log(res.error);
        this.dataProvider.dismissLoading();
        this.dataProvider.presentAlert("Post failed", res.error.text);
      }else{ 
        console.log(res);
        this.dataProvider.dismissLoading();
      }
    }).catch(err => {
      console.log(err);
      this.dataProvider.dismissLoading();
    })
  }

  getJobs(){
    this.dataProvider.loadJobs().then(res => {
      this.jobs = res;
      console.log(res);
    }).catch(err => {
      console.log(err);
    })
  }

  jobDetails(job){
    this.navCtrl.push(JobDetailsPage, {job:job});
  }

}
