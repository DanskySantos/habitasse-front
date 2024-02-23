import { NgModule} from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
 

@NgModule({
    imports: [
        AppLayoutModule,
        AppRoutingModule,
        FormsModule,
        ToastModule
    ],
    declarations: [
        AppComponent,
 
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
