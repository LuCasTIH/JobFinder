import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import firebase from 'firebase';
import { JobDetailsPage } from '../job-details/job-details';
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  // locations=[];
  constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation, public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let element = document.getElementById('map');

    let locationOptions = { timeout: 10000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(locationOptions).then(resp => {
      let latlng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(latlng);
      let mapOptions: GoogleMapOptions = {
        camera: {
          target: latlng,
          zoom: 18,
          tilt: 30,
        }
      };
      let map: GoogleMap = this.googleMaps.create(element, mapOptions);
      map.one(GoogleMapsEvent.MAP_READY).then(() => {

        // let position: CameraPosition<any> = {
        //   target: latlng,
        //   zoom: 18,
        //   tilt: 30
        // };
        // map.moveCamera(position);
        map.addMarker({
          title: 'Vị trí của bạn',
          icon: 'blue',
          animation: 'DROP',
          position: latlng
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                marker.showInfoWindow();
              });
          });

          firebase.database().ref("PostedJobs").on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
              
              map.addMarker({
                title: childSnapshot.val().title,
                snippet: childSnapshot.val().address,
                position: {
                  lat: childSnapshot.val().lat,
                  lng: childSnapshot.val().lng
                }
              })
                .then(marker => {
                  marker.showInfoWindow();
                  marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {
                      this.navCtrl.push(JobDetailsPage, { param: childSnapshot.key });
                    });
                });

              // this.locations.push({
              //   title: childSnapshot.val().title,
              //   latitude: childSnapshot.val().lat,
              //   longitude: childSnapshot.val().lng,
              //   key: childSnapshot.key,
              // });
              return false;
            });
          });



      });
    });
  }
}



