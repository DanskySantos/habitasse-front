import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DemandRegisterComponent} from "./demand-register/demand-register.component";
import {AppConfigModule} from "../../../layout/config/config.module";
import {InputNumberModule} from "primeng/inputnumber";
import {SharedModule} from "../shared/shared.module";
import {PasswordModule} from "primeng/password";
import {ReceptionRoutingModule} from "./reception-routing.module";
import {UserRegisterComponent} from "./user-register/user-register.component";

@NgModule({
    declarations: [
        DemandRegisterComponent,
        UserRegisterComponent
    ],
    imports: [
        CommonModule,
        ReceptionRoutingModule,
        AppConfigModule,
        InputNumberModule,
        SharedModule,
        PasswordModule
    ]
})
export class ReceptionModule { }
