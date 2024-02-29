import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {ErrorComponent} from "./error/error.component";
import {RegisterComponent} from "./register/register.component";
import {AccessdeniedComponent} from "./accessdenied/accessdenied.component";
import {ForgotPasswordComponent} from "./forgotpassword/forgotpassword.component";
import {LockScreenComponent} from "./lockscreen/lockscreen.component";
import {LoginComponent} from "./login/login.component";
import {NewPasswordComponent} from "./newpassword/newpassword.component";
import {UserType} from "./user-type/user-type";
import {VerificationComponent} from "./verification/verification.component";
import {AppConfigModule} from "../../../layout/config/config.module";
import {InputNumberModule} from "primeng/inputnumber";
import {SharedModule} from "../shared/shared.module";
import {PasswordModule} from "primeng/password";

@NgModule({
    declarations: [
        ErrorComponent,
        RegisterComponent,
        AccessdeniedComponent,
        ForgotPasswordComponent,
        LockScreenComponent,
        LoginComponent,
        NewPasswordComponent,
        UserType,
        VerificationComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        AppConfigModule,
        InputNumberModule,
        SharedModule,
        PasswordModule
    ]
})
export class AuthModule { }
