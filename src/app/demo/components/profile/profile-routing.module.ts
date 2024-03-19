import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileUpdateComponent} from "./update-user/profile-update.component";
import {ProfileComponent} from "./profile.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Perfil'}, component: ProfileComponent },
        { path: 'update', data: {breadcrumb: 'Editar Dados'}, component: ProfileUpdateComponent },
        { path: 'update-password', data: {breadcrumb: 'Editar Senha'}, component: ProfileUpdateComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
