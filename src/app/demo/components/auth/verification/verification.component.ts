import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {InputNumber} from 'primeng/inputnumber';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../profile/service/user-service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {UserModel} from "../../shared/models/user.model";
import {Router} from "@angular/router";

@Component({
    templateUrl: './verification.component.html'
})
export class VerificationComponent {

    loading: boolean = false;
    verificationForm!: FormGroup;
    userData?: UserModel;

    constructor(private authService: AuthService,
                private layoutService: LayoutService,
                private router: Router,
                private userService: UserService,
                private ngxUiLoaderService: NgxUiLoaderService) {
        this.getUserProfile();
        this.createForm();
    }

    private createForm() {
        this.verificationForm = new FormGroup({
            number1: new FormControl(null, Validators.required),
            number2: new FormControl(null, Validators.required),
            number3: new FormControl(null, Validators.required),
            number4: new FormControl(null, Validators.required),
            number5: new FormControl(null, Validators.required),
            number6: new FormControl(null, Validators.required)
        });
    }

    getUserProfile() {
        this.ngxUiLoaderService.start();
        this.userService.getUserProfile().subscribe(
            data => {
                this.userData = data;
                this.ngxUiLoaderService.stop();
                console.log(data)
                if (this.userData && this.userData.birthday) {
                    this.userData.birthday = this.formatarData(this.userData.birthday);
                }
            },
            error => {
                console.error('Error', error);
                this.ngxUiLoaderService.stop();
                this.router.navigateByUrl('/auth/login');
            }
        )
        this.ngxUiLoaderService.stop();
    }

    formatarData(data: string): string {
        const dataNascimento = new Date(data);
        return dataNascimento.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    get filledInput(): boolean {
        return this.layoutService.config().inputStyle === 'filled';
    }

    focusOnNext(inputEl: InputNumber) {
        inputEl.input.nativeElement.focus();
    }

    submit() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
        this.authService.authorizeAccount(
            {
                code: Number(this.concatCode(this.verificationForm.value)),
                email: localStorage.getItem('userEmail')!
            }
        );
    }

    private concatCode(values: any) {
        return Object.values(values).join('');
    }

    resendCode() {
        this.authService.resendCode(localStorage.getItem('userEmail')!);
    }
}
