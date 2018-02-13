import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserMoreDetailsPage } from '../user-more-details/user-more-details';
 

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {

  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }

  loadUserMoreDetails(cat){
    let contactModal = this.modalCtrl.create(UserMoreDetailsPage, {category: cat});
    contactModal.present();
  }

}
