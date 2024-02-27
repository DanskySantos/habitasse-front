import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { PanelModule} from  'primeng/panel';
import { InputMaskModule } from 'primeng/inputmask';
import {FormFieldErrorComponent} from "./components/form-field-error/form-field-error.component";

@NgModule({
  declarations: [
    FormFieldErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    CalendarModule,
    AutoCompleteModule,
    InputMaskModule,
    PanelModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RippleModule,
    DialogModule,
    InputTextModule,
    DropdownModule,
    FileUploadModule,
    InputTextareaModule,
    CalendarModule,
    AutoCompleteModule,
    InputMaskModule,
    PanelModule,
    FormFieldErrorComponent,
  ]
})
export class SharedModule { }
