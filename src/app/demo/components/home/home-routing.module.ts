import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { HomeComponent } from './home.component';
import { PropertyDemandComponent } from './property-demand/property-demand.component';
import {MyDemandsComponent} from "./my-demands/my-demands.component";
import {AllDemandsComponent} from "./all-demands/all-demands.component";


@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            data: {breadcrumb: 'Home'},
            component: HomeComponent
        },
        {
            path: 'property-demand',
            data: {breadcrumb: 'Cadastro de demandas'},
            component: PropertyDemandComponent
        },
        {
            path: 'my-demands',
            data: {breadcrumb: 'Minhas Demandas'},
            component: MyDemandsComponent
        },
        {
            path: 'all-demands',
            data: {breadcrumb: 'Todas Demandas'},
            component: AllDemandsComponent
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
