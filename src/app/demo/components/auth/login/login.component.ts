import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient} from '@angular/common/http';
import { Credentials } from '../models/credentials.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Observable} from "rxjs";

@Component({
    templateUrl: './login.component.html',
    selector: 'button-loading-demo',
})
export class LoginComponent implements OnInit {

    loading: boolean = false;
    loginForm!: FormGroup;

    constructor(private authService: AuthService) {}

    ngOnInit() {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
    get emailControl() {
        return this.loginForm.get('email')!;
    }

    get passwordControl() {
        return this.loginForm.get('password')!;
    }

    login() {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            return;
        }
        const credentials: Credentials = {
            email: this.emailControl.value,
            password: this.passwordControl.value
        };
        this.authService.login(credentials).subscribe();
    }

    get filledInput(): boolean {
        return false;
    }
}
