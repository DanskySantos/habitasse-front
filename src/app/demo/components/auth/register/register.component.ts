import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";

@Component({
    templateUrl: './register.component.html',
    selector: 'button-loading-demo',

})
export class RegisterComponent implements OnInit {

    loading: boolean = false;
    registerForm!: FormGroup;
    maxDate: Date = new Date();

    constructor(private authService: AuthService) {
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            username: new FormControl('', [Validators.required, Validators.minLength(5)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            birthday: new FormControl(''),
        })
    }

    submit() {
        this.authService.register(this.registerForm.value).subscribe()
        console.log(this.registerForm.value);
    }

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    get name() {
        return this.registerForm.get('name')!;
    }

    get username() {
        return this.registerForm.get('username')!;
    }

    get email() {
        return this.registerForm.get('email')!;
    }

    get password() {
        return this.registerForm.get('password')!;
    }

    get birthday() {
        return this.registerForm.get('birthday')!;
    }
}
