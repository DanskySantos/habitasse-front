import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from "../shared/shared.module";
import {TableModule} from "primeng/table";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import { ProfileCreateComponent } from './edit/profile-create.component';
import {PasswordModule} from "primeng/password";
import { DialogModule } from 'primeng/dialog';
@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        TableModule,
        InputGroupModule,
        InputGroupAddonModule,
        PasswordModule,
        DialogModule
    ],
    exports: [
        ProfileCreateComponent
    ],
    
    declarations: [
        ProfileCreateComponent
    ]
})
export class ProfileModule {
}
