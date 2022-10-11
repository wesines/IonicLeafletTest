import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { UserService } from '../services/User.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  lattitude: number;
  longitude: number;
  locationWatchStarted: boolean;
  watch: any;
  id: null;
  locationTraces = [];

  constructor(
    private route: ActivatedRoute,

    private userService: UserService,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.id = params.id;
    });
  }
  getUserData() {
    if (this.id != null) {
      this.userService.getUser(this.id).subscribe((res) => {
        this.lattitude = res['lat'];
        this.longitude = res['lng'];
        console.log('res', res);

        this.watch = this.geolocation.watchPosition({
          enableHighAccuracy: true,
          timeout: 5000,
        });
        this.watch.subscribe((resp) => {
          this.locationWatchStarted = true;
          this.locationTraces.push({
            latitude: resp.coords.latitude,
            longitude: resp.coords.latitude,
            timestamp: resp.timestamp,
          });

          const body = {
            lat: this.lattitude,
            lng: this.longitude,
          };
          this.userService.updateData(body, res['id']);
        });
      });
    }
  }
}
