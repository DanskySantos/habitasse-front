import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AboutUsComponent} from "./aboutus/aboutus.component";
import {EmptyComponent} from "./empty/empty.component";
import {HelpComponent} from "./help/help.component";
import {LandingComponent} from "./landing/landing.component";
import {NotfoundComponent} from "./notfound/notfound.component";

@NgModule({
    imports: [RouterModule.forChild([
        {path: 'aboutus', data: {breadcrumb: 'Sobre'}, component: AboutUsComponent},
        {path: 'empty', data: {breadcrumb: 'Vazio'}, component: EmptyComponent},
        {path: 'help', data: {breadcrumb: 'Help'}, component: HelpComponent},
        {path: 'landing', data: {breadcrumb: 'Landing Page'}, component: LandingComponent},
        {path: 'notfound', data: {breadcrumb: 'Não Encontrado'}, component: NotfoundComponent},
        {path: '**', redirectTo: '/notfound'}
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
