import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from './profile-routing.module';
import {ProfileListComponent} from "./list/profilelist.component";
import {ProfileCreateComponent} from "./create/profilecreate.component";
import {SharedModule} from "../shared/shared.module";
import {TableModule} from "primeng/table";
import {InputGroupModule} from "primeng/inputgroup";
import {InputGroupAddonModule} from "primeng/inputgroupaddon";

@NgModule({
    imports: [
        CommonModule,
        ProfileRoutingModule,
        SharedModule,
        TableModule,
        InputGroupModule,
        InputGroupAddonModule
    ],
    declarations: [
        ProfileListComponent,
        ProfileCreateComponent
    ]
})
export class ProfileModule {
}
