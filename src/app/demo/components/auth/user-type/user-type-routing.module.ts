import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UserType} from "./user-type";


@NgModule({
    imports: [RouterModule.forChild([
        {path: '', component: UserType}
    ])],
    exports: [RouterModule]
})
export class UserTypeRoutingModule {
}
