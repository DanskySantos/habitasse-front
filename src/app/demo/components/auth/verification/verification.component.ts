import {Component} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {InputNumber} from 'primeng/inputnumber';
import {AuthService} from "../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    templateUrl: './verification.component.html'
})
export class VerificationComponent {

    loading: boolean = false;
    verificationForm!: FormGroup;

    constructor(private authService: AuthService,
                private layoutService: LayoutService) {
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
