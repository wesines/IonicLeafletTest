import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/User.service';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  userForm: FormGroup;
  lattitude: string;
  longitude: string;
  constructor(
    private geolocation: Geolocation,
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      username: [''],
      password: [''],
      city: [''],
      lat: [''],
      lng: [''],
    });
  }

  onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userService.createUser(this.userForm.value).subscribe((response) => {
        console.log('response', response);

        this.zone.run(() => {
          this.userForm.reset();
          // this.router.navigate([`/tabs/tab3/id=${response.id}`]);
          this.router.navigate(['/tabs/tab3'], {
            queryParams: { id: response.id },
          });
        });
      });
    }
  }
}
