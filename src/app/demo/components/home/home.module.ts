import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {PropertyDemandComponent} from './property-demand/property-demand.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MyDemandsComponent} from "./my-demands/my-demands.component";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        DropdownModule,
        InputTextareaModule
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
