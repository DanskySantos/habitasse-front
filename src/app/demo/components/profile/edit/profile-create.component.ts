import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { UserService } from '../service/UserService';
import { User } from '../interface/User';

@Component({
    templateUrl: './profile-create.component.html'
})
export class ProfileCreateComponent implements OnInit {
    userData: User | undefined;

    constructor(private userService: UserService, ) {}

    ngOnInit() {
      this.getUserProfile();
    }

    getUserProfile() {
      this.userService.getUserProfile().subscribe(
      )
    }
}
