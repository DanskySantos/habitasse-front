import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RippleModule } from 'primeng/ripple';
import { AppMenuComponent } from './menu/app.menu.component';
import { AppMenuitemComponent } from './menu/app.menuitem.component';
import { RouterModule } from '@angular/router';
import { AppTopBarComponent } from './topbar/app.topbar.component';
import { AppSidebarComponent } from './sidebar/app.sidebar.component';
import { AppFooterComponent } from './footer/app.footer.component';
import { AppConfigModule } from './config/config.module';
import { AppLayoutComponent } from './app.layout.component';
import { AppBreadcrumbComponent } from './breadcrumb/app.breadcrumb.component';
import { StyleClassModule } from 'primeng/styleclass';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';

@NgModule({
    declarations: [
        AppMenuitemComponent,
        AppTopBarComponent,
        AppSidebarComponent,
        AppFooterComponent,
        AppMenuComponent,
        AppLayoutComponent,
        AppBreadcrumbComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        InputTextModule,
        InputSwitchModule,
        MenuModule,
        RouterModule,
        DropdownModule,
        SidebarModule,
        StyleClassModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        RippleModule,
        RouterModule,
        TooltipModule,
        AppConfigModule
    ],
    exports: [AppLayoutComponent]
})
export class AppLayoutModule { }
