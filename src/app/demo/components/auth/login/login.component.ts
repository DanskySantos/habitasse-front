import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient} from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private http: HttpClient, private router: Router) {}

  login() {
    const credentials: Credentials = { email: this.email, password: this.password };
    this.authService.login(credentials).subscribe(
      (response) => {
		this.authService.loginSuccess(response.token);
      },
      () => {
		this.authService.loginFailed();
      }
    );
  }

  get filledInput(): boolean {
    return false; // You need to implement this logic as per your requirement
  }
}
