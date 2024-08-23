import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../auth/services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserTypeEnum} from "../../enums/user-type-enum";

@Component({
    templateUrl: './user-register.component.html'
})
export class UserRegisterComponent implements OnInit {

    userType?: string[];

    loading: boolean = false;
    registerForm!: FormGroup;
    maxDate: Date = new Date();

    constructor(private authService: AuthService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.authService.deleteCookies();
        this.createForm();
    }

    private createForm() {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            birthday: new FormControl(''),
            phone: new FormControl(''),
            userRoles: new FormControl('Quero encontrar um imóvel', Validators.required),
            propertyDemandId: new FormControl(localStorage.getItem('propertyDemandId'), Validators.required)
        });
        localStorage.removeItem('propertyDemandId')
    }

    submit() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
        localStorage.setItem('userEmail', this.email.value)
        this.setRole(UserTypeEnum, this.userRoles.value)
        this.authService.registerNewUser(this.registerForm.value);
    }

    setRole(object: any, value: any) {
        this.registerForm.get('userRoles')?.patchValue(Object.keys(object).find(key => object[key] === value));
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

    get phone() {
        return this.registerForm.get('phone')!;
    }

    get userRoles() {
        return this.registerForm.get('userRoles')!;
    }
}
