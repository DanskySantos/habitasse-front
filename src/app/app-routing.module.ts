import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './layout/app.layout.component';
import {AuthGuard} from './demo/components/auth/guards/auth-guard.service';
import {ProfileModule} from "./demo/components/profile/profile.module";
import {PropertyDemandModule} from "./demo/components/property-demand/property-demand.module";

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            {
                path: '',
                canActivate: [AuthGuard],
                loadChildren: () => import('./demo/components/dashboards/dashboards.module').then(m => m.DashboardsModule)
            },
            {
                path: 'utilities',
                canActivate: [AuthGuard],
                data: {breadcrumb: 'Utilities'},
                loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule)
            },
            {
                path: 'pages',
                canActivate: [AuthGuard],
                data: {breadcrumb: 'Pages'},
                loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule)
            },
            {
                path: 'property-demand',
                canActivate: [AuthGuard],
                data: {breadcrumb: 'Demanda de Propriedade'},
                loadChildren: () => import('./demo/components/property-demand/property-demand.module').then(m => m.PropertyDemandModule)
            },
            {
                path: 'profile',
                canActivate: [AuthGuard],
                data: {breadcrumb: 'User Management'},
                loadChildren: () => import('./demo/components/profile/profile.module').then(m => m.ProfileModule)
            },
        ]
    },
    {
        path: 'auth',
        data: {breadcrumb: 'Auth'},
        loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule)
    },
    {path: '**', redirectTo: '/notfound'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
