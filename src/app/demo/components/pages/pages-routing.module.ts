import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'aboutus', data: { breadcrumb: 'About' }, loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutUsModule) },
        { path: 'crud', data: { breadcrumb: 'Crud' }, loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'demand', data: { breadcrumb: 'Demand' }, loadChildren: () => import('../auth/demand/demand.module').then(m => m.DemandDemoModule) },
        { path: 'empty', data: { breadcrumb: 'Empty' }, loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'help', data: { breadcrumb: 'Help' }, loadChildren: () => import('./help/help.module').then(m => m.HelpModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
