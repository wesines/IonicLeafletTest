import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../services/User.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage {
  userForm: FormGroup;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private userService: UserService
  ) {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      username: [''],
    });
  }
  onSubmit() {
    if (!this.userForm.valid) {
      return false;
    } else {
      this.userService.createUser(this.userForm.value).subscribe((response) => {
        this.zone.run(() => {
          this.userForm.reset();
          this.router.navigate(['/list']);
        });
      });
    }
  }
}
