import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'user-type',
  templateUrl: './user-type.html',
})
export class UserType {

    role: any;

  constructor(private router: Router) {
  }

  onSelectRole(userRole: string) {
      this.role = userRole;
  }

}
