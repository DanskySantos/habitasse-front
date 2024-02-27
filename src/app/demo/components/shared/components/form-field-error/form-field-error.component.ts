import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
    selector: 'app-form-field-error',
    template: `
        <p *ngIf="errorMessage" class="p-inline-message p-inline-message-error">
            {{ errorMessage }}
        </p>
    `,
    styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {


    @Input('form-control')
    formControl?: AbstractControl;

    constructor() {
    }

    ngOnInit() {

    }

    public get errorMessage(): string | null {
        if (this.mustShowErrorMessage())
            return this.getErrorMessage();
        else
            return null;
    }

    private mustShowErrorMessage(): boolean | undefined {
        return this.formControl?.invalid && this.formControl.touched;
    }

    private getErrorMessage(): string | null {
        if (this.formControl?.errors?.['required'])
            return "Dado obrigatório";

        else if (this.formControl?.errors?.['email']) {
            return "Formato de email inválido";
        } else if (this.formControl?.errors?.['minlength']) {
            const requiredLength = this.formControl.errors?.['minlength'].requiredLength;
            return `Deve ter no mínimo ${requiredLength} caracteres`
        } else if (this.formControl?.errors?.['maxlength']) {
            const requiredLength = this.formControl.errors?.['maxlength'].requiredLength;
            return `Deve ter no máximo ${requiredLength} caracteres`;
        } else if (this.formControl?.errors?.['cpfNotValid']) {
            return `CPF inválido`;
        } else if (this.formControl?.errors?.['cnpjNotValid']) {
            return `CNPJ inválido`;
        }
        return null;
    }
}
