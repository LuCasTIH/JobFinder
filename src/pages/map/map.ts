import { Component } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  constructor(private googleMaps: GoogleMaps, private geolocation: Geolocation) { }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let element = document.getElementById('map');
    let map: GoogleMap = this.googleMaps.create(element, {});
    let locationOptions = { timeout: 10000, enableHighAccuracy: true };
    this.geolocation.getCurrentPosition(locationOptions).then(resp => {
      let latlng = new LatLng(resp.coords.latitude, resp.coords.longitude);
      console.log(latlng);
      let mapOptions: GoogleMapOptions = {
        camera: {
          target:latlng,
          zoom: 18,
          tilt: 30,
        }
      };
      map = this.googleMaps.create('map_canvas', mapOptions);
      map.one(GoogleMapsEvent.MAP_READY).then(() => {
        
                // let position: CameraPosition<any> = {
                //   target: latlng,
                //   zoom: 18,
                //   tilt: 30
                // };
                // map.moveCamera(position);
        
                let usermarker: MarkerOptions = {
                  position: latlng,
                  title: 'Vị trí của bạn',
                };
                map.addMarker(usermarker).then((marker: Marker) => {
                  marker.showInfoWindow();
                });
              });
            });
  }
}



