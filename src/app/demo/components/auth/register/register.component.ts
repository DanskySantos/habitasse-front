import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute} from '@angular/router';
import {UserTypeEnum} from "../../enums/user-type-enum";
@Component({
    templateUrl: './register.component.html',
    selector: 'app-register',

})
export class RegisterComponent implements OnInit {

    userType?: string[];

    loading: boolean = false;
    registerForm!: FormGroup;
    maxDate: Date = new Date();

    constructor(private authService: AuthService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.createForm();
        this.startLists();
    }

    startLists() {
        this.userType = Object.values(UserTypeEnum);
    }

    private createForm() {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            username: new FormControl('', [Validators.required, Validators.minLength(5)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            birthday: new FormControl(''),
            userRoles: new FormControl('', Validators.required)
        });
    }

    submit() {
        this.authService.register(this.registerForm.value).subscribe()
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
