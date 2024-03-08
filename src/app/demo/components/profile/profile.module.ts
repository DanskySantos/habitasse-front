import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from "../shared/shared.module";
import {TableModule} from "primeng/table";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import { ProfileUpdateComponent } from './update/profile-update.component';
import {PasswordModule} from "primeng/password";
import { DialogModule } from 'primeng/dialog';
import {ProfileComponent} from "./profile.component";
import {AvatarModule} from "primeng/avatar";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        TableModule,
        InputGroupModule,
        InputGroupAddonModule,
        PasswordModule,
        DialogModule,
        AvatarModule
    ],
    exports: [
        ProfileUpdateComponent,
        ProfileComponent
    ],
    declarations: [
        ProfileUpdateComponent,
        ProfileComponent
    ]
})
export class ProfileModule {
}
