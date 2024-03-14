import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {PropertyDemandComponent} from './property-demand/property-demand.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MyDemandsComponent} from "./my-demands/my-demands.component";
import {AvatarModule} from "primeng/avatar";
import { DialogModule } from 'primeng/dialog';
@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        DropdownModule,
        InputTextareaModule,
        AvatarModule,
        NgOptimizedImage,
        DialogModule
    ],
    exports: [
        HomeComponent,
        PropertyDemandComponent,
        MyDemandsComponent
    ],
    declarations: [
        HomeComponent,
        PropertyDemandComponent,
        MyDemandsComponent
    ]
})
export class HomeModule {
}
