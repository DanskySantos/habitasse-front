import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from "../shared/shared.module";
import {TableModule} from "primeng/table";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";
import { ProfileCreateComponent } from './edit/profile-create.component';


@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        TableModule,
        InputGroupModule,
        InputGroupAddonModule,
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
