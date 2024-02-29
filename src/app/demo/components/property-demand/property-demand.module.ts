import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PropertyDemandRoutingModule} from './property-demand-routing.module';
import {PropertyDemandComponent} from "./create-property-demand/property-demand.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        PropertyDemandRoutingModule,
        SharedModule
    ],
    exports: [
        PropertyDemandComponent
    ],
    declarations: [
        PropertyDemandComponent
    ]
})
export class PropertyDemandModule {
}
