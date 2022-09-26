import { Component } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { UserService } from '../services/User.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  lattitude: number;
  longitude: number;

  constructor(private geolocation: Geolocation) {}

  getGeoLocation() {
    console.log('click');
    setInterval(() => {
      this.geolocation
        .getCurrentPosition()
        .then((resp) => {
          this.lattitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          console.log(this.lattitude, '  ', this.longitude);
        })
        .catch((err) => {
          console.log('error getting location', err);
        });
    }, 5000);
  }
}
