import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { DataProvider } from '../../providers/data/data';
import { UserDetailsPage } from '../user-details/user-details';
@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})
export class AppointmentsPage {

  appointmentSegment: string = 'offered';
 
  offered: any = [];
  accepted: any = [];
  rejected: any = [];
  
  profile: any;
  users: any;
  appointments: any;
  myAppointments: any = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider,
    public ionEvents: Events) {  
      this.profile = JSON.parse(localStorage.getItem('user'));  
    }
    
  ionViewDidLoad() {
    this.dataProvider.loadAppointments().then(res => {
      res.map(aUser =>  {
        if(this.profile.type == 'Employer'){
          if( aUser.appointer_id == this.profile.user_id){
            this.myAppointments.push(aUser);
          }
        }else if(this.profile.type == 'Employee'){
          if( aUser.appointed_id == this.profile.user_id){
            this.myAppointments.push(aUser);
          }
        }
      })
    }).then(() => {
      console.log(this.myAppointments)
      this.dataProvider.loadUsers().then(res => {
          this.mapUserWithAppointments(res, this.myAppointments);
      }).catch(err => {
        console.log(err);
      });
    })
    .catch(err => {
      console.log(err);
    });
  }

  mapUserWithAppointments(users, app){
    app.map(aUser => {
      users.map(user => {
        if(aUser.appointer_id == user.user_id && aUser.appointed_id == this.profile.user_id){
          if(aUser.status == 'offered'){
            this.offered.push(user);
          }
          else if(aUser.status == 'accepted'){
            this.accepted.push(user);
          }
          else if(aUser.status == 'rejected'){
            this.rejected.push(user);
          }
        }
        else if(aUser.appointed_id == user.user_id && aUser.appointer_id == this.profile.user_id){
          if(aUser.status == 'offered'){
            this.offered.push(user);
          }
          else if(aUser.status == 'accepted'){
            this.accepted.push(user);
          }
          else if(aUser.status == 'rejected'){
            this.rejected.push(user);
          }
        }
      })
    })
  }

  viewUserProfile(user){
    this.navCtrl.push(UserDetailsPage, {user: user, page: 'AppointmentsPage'});
  }

}
