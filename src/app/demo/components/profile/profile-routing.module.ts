import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileCreateComponent} from "./edit/profile-create.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'edit', data: {breadcrumb: 'Editar'}, component: ProfileCreateComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
