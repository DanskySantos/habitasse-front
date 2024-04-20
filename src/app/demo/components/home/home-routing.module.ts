import {inject, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, RouterModule, RouterStateSnapshot} from '@angular/router';
import { HomeComponent } from './home.component';
import { PropertyDemandComponent } from './property-demand/property-demand.component';
import {MyDemandsComponent} from "./my-demands/my-demands.component";
import {AllDemandsComponent} from "./all-demands/all-demands.component";
import {AccessGuard} from "../guards/access.guard";

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: '',
            data: {breadcrumb: 'Home'},
            component: HomeComponent
        },
        {
            path: 'property-demand',
            canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AccessGuard).canActivate(next, state)],
            data: {breadcrumb: 'Cadastro de demandas'},
            component: PropertyDemandComponent
        },
        {
            path: 'my-demands',
            canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AccessGuard).canActivate(next, state)],
            data: {breadcrumb: 'Minhas Demandas'},
            component: MyDemandsComponent
        },
        {
            path: 'all-demands',
            canActivate: [(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AccessGuard).canActivate(next, state)],
            data: {breadcrumb: 'Todas Demandas'},
            component: AllDemandsComponent
        }
    ])],
    exports: [RouterModule]
})
export class HomeRoutingModule {
}
