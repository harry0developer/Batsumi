import { Component, NgZone, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-autocomplete',
  templateUrl: 'autocomplete.html',
})

export class AutocompletePage {
  autocompleteItems: any;
  autocomplete: any;

  latitude: number = 0;
  longitude: number = 0;
  geo: any
  location: any;

  service = new google.maps.places.AutocompleteService();
  @ViewChild('searchBar') myInput ;
  
  constructor (public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
    setTimeout(() => {
      this.myInput.setFocus();
    },500);
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  chooseItem(item: any) {
    
    this.geo = item; 
    let loc = this.geoCode(this.geo);
    // console.log(loc);//convert Address to lat and long
    // this.viewCtrl.dismiss({address:this.geo});
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query,  componentRestrictions: {country: 'ZA'} }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        if(predictions){
          predictions.forEach(function (prediction) {
            me.autocompleteItems.push(prediction.description);
          });
        }
        });
    });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    let geocoder = new google.maps.Geocoder();
    return geocoder.geocode({ 'address': address }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      console.log("lat: " + this.latitude + ", long: " + this.longitude);
      this.viewCtrl.dismiss({address: address, lat: this.latitude, lng: this.longitude});
    });
 }
}
