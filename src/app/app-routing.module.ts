import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AppLayoutComponent} from './layout/app.layout.component';
import {AuthGuard} from './demo/components/auth/guards/auth-guard.service';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: AppLayoutComponent,
        children: [
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
                path: 'home',
                canActivate: [AuthGuard],
                data: {breadcrumb: 'Home'},
                loadChildren: () => import('./demo/components/home/home.module').then(m => m.HomeModule)
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
