import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {DemandRegisterComponent} from "./demand-register/demand-register.component";
import {UserRegisterComponent} from "./user-register/user-register.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'demand-register', data: {breadcrumb: 'Nova Demanda'}, component: DemandRegisterComponent},
        {path: 'user-register', data: {breadcrumb: 'Novo Usuário'}, component: UserRegisterComponent},
        {path: '**', redirectTo: '/notfound'}
    ])],
    exports: [RouterModule]
})
export class ReceptionRoutingModule {
}
