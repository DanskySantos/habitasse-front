import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ProfileListComponent} from "./list/profilelist.component";
import {ProfileCreateComponent} from "./create/profilecreate.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'list', data: {breadcrumb: 'Lista'}, component: ProfileListComponent },
        { path: 'create', data: {breadcrumb: 'Criar'}, component: ProfileCreateComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
