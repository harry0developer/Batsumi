import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { AutocompletePage } from '../autocomplete/autocomplete';

@IonicPage()
@Component({
  selector: 'page-post-jobs',
  templateUrl: 'post-jobs.html',
})
export class PostJobsPage {
  data:any;
  categories: any;  

  constructor(public navCtrl: NavController,private dataProvider: DataProvider, public modalCtrl: ModalController, public navParams: NavParams) {
    this.data = {   }; 
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostJobsPage');
    this.dataProvider.getCategories().then(res => {
      this.categories = res;
      console.log(res);
    })
  }

 
  postJob(){
    this.dataProvider.presentLoading("Please wait...");
    let res;  
 
    if(this.data && this.data.category ){
      this.data.category = this.data.category.toString();
    }
    console.log(this.data);
    this.dataProvider.postData(this.data, "addJob").then((result) => {
      console.log(result);
      res = result;
      if(res && res.error){
        console.log(res.error);
        this.dataProvider.dismissLoading();
        this.dataProvider.presentAlert("Posting job failed", res.error.text);
      }else{ 
        this.dataProvider.dismissLoading();
      }
    }).catch(err => {
      console.log(err);
      this.dataProvider.dismissLoading();
    })
  }

  openPlaceModel(){
    let profileModal = this.modalCtrl.create(AutocompletePage);
    profileModal.onDidDismiss(data => {
      console.log(data);

      if(data && data.address && data.lat && data.lng){
        this.data.address = data.address;
        this.data.lat = data.lat;
        this.data.lng = data.lng;

        if(data.offer == 'Negotiable'){
          data.offerValue = 0;
        }

        let date = new Date();

        this.data.date_created = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        console.log(this.data.date_created);
      }
    });
    profileModal.present();
  }




}
