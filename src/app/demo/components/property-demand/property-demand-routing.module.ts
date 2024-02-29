import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {PropertyDemandComponent} from "./create-property-demand/property-demand.component";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'property-demand',
            data: {breadcrumb: 'Demanda de Imóvel'},
            component: PropertyDemandComponent
        }
    ])],
    exports: [RouterModule]
})
export class PropertyDemandRoutingModule {
}
