import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
 

@IonicPage()
@Component({
  selector: 'page-filter',
  templateUrl: 'filter.html',
})
export class FilterPage {
  type: any;
  filter: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterPage');
    this.filter = this.navParams.get('type');
    this.type = this.filter;
  }

  dismissModal(){
    this.viewCtrl.dismiss(this.filter);
  }

  apply(){
    console.log(this.type)
    this.viewCtrl.dismiss(this.type);
    
  }

}
