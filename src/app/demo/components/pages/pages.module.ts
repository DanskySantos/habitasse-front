import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {AboutUsComponent} from "./aboutus/aboutus.component";
import {LandingComponent} from "./landing/landing.component";
import {HelpComponent} from "./help/help.component";
import {NotfoundComponent} from "./notfound/notfound.component";
import {EmptyComponent} from "./empty/empty.component";
import {AppConfigModule} from "../../../layout/config/config.module";
import {StyleClassModule} from "primeng/styleclass";

@NgModule({
    declarations: [
        AboutUsComponent,
        LandingComponent,
        NotfoundComponent,
        EmptyComponent,
        HelpComponent
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        AppConfigModule,
        StyleClassModule
    ]
})
export class PagesModule {
}
