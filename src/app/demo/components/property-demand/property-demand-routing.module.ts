import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PropertyDemandComponent} from "./create-property-demand/property-demand.component";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            component: PropertyDemandComponent
        }
    ])],
    exports: [RouterModule]
})
export class PropertyDemandRoutingModule {
}
