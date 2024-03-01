import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home.component';
import { PropertyDemandComponent } from './property-demand/property-demand.component';


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            data: {breadcrumb: 'Home'},
            component: HomeComponent
        },
        {
            path: 'property-demand',
            data: {breadcrumb: 'Demanda de Imóvel'},
            component: PropertyDemandComponent
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
