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

    constructor(private authService: AuthService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.authService.deleteCookies();
        this.createForm();
        this.startLists();
    }

    startLists() {
        this.userType = Object.values(UserTypeEnum);
    }

    private createForm() {
        this.registerForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(5)]),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', [Validators.required, Validators.minLength(5)]),
            birthday: new FormControl(''),
            phone: new FormControl(''),
            userRoles: new FormControl('', Validators.required)
        });
        this.registerForm.get('userRoles')?.valueChanges.subscribe(role => {
            this.setValidatorsBasedOnRole(role);
        });
    }

    private setValidatorsBasedOnRole(role: string | null) {
        if (role === 'Quero fazer ofertas') {
            this.registerForm.get('phone')?.setValidators([Validators.required]);
        } else {
            this.registerForm.get('phone')?.clearValidators();
        }

        if (role === 'Quero encontrar um imóvel') {
            this.registerForm.get('suggestedValueForRent')?.clearValidators();
        }
        this.registerForm.get('phone')?.updateValueAndValidity();
    }

    goBack() {
        window.history.back();
    }

    submit() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
        localStorage.setItem('userEmail', this.email.value)
        this.setRole(UserTypeEnum, this.userRoles.value)
        this.authService.register(this.registerForm.value);
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
