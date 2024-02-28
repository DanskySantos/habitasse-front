import {LOCALE_ID, NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AppLayoutModule} from './layout/app.layout.module';
import {FormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CookieService} from "ngx-cookie-service";


@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        FormsModule,
        ToastModule,
        BrowserAnimationsModule,
    ],
    declarations: [
        AppComponent,

    ],
    providers: [
        CookieService,
        {provide: LOCALE_ID, useValue: 'pt-BR'},
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
