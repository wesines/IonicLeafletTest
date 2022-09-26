import { Component } from '@angular/core';
import { UserService } from '../services/User.service';
import * as Leaflet from 'leaflet';
import { icon } from 'leaflet';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  map: Leaflet.Map;
  propertyList = [];

  constructor(private userservice: UserService) {}

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId').setView([48.633333, 4.365489], 16);

    Leaflet.tileLayer(
      'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    ).addTo(this.map);
    this.userservice.loadFromAPI().subscribe((data) => {
      data.forEach((item) => {
        const obj = { lat: item.lat, lng: item.lng, city: item.city };
        // console.log(obj);

        this.propertyList.push(obj);
        this.leafletMap();
      });
    });
  }
  leafletMap() {
    for (const property of this.propertyList) {
      //   console.log(property);
      Leaflet.marker([property.lat, property.lng], {
        icon: icon({
          iconSize: [20, 50], // size of the icon
          shadowSize: [1, 2], // size of the shadow
          iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
          shadowAnchor: [4, 62], // the same for the shadow
          popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
          iconUrl: './../../assets/icon/marker.png',
          shadowUrl: './../../assets/icon/marker.png',
        }),
      })
        .addTo(this.map)
        .bindPopup(property.city);
      // .openPopup();
    }
  }

  ionViewWillLeave() {
    this.map.remove();
  }
}
/*  {# <div class="container">
    <ion-button expand='block' (click)="getGeoLocation()">Obtenir localisation</ion-button>
    <p>Lattitude : <strong>{{lattitude}}</strong></p>
    <p>Longitude : <strong>{{longitude}}</strong></p>
  </div> #}*/
