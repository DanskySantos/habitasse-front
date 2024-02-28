import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {UserType} from "./user-type";
import {UserTypeRoutingModule} from "./user-type-routing.module";
import {RegisterModule} from "../register/register.module";


@NgModule({
    imports: [
        CommonModule,
        UserTypeRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        RegisterModule
    ],
    declarations: [UserType]
})
export class UserTypeModule {
}
