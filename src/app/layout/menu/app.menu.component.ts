import {Component, OnInit} from '@angular/core';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    role: any;

    constructor(private cookieService: NgxCookieService) {
        this.getRole();
    }

    private getRole() {
        this.role = this.cookieService.get('userRole');
    }

    ngOnInit() {
        if (this.role == 'USER_CD') {
            this.model = [
                {
                    label: 'Perfil',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/profile'],

                },
                {
                    label: 'Nova Demanda',
                    icon: 'pi pi-plus',
                    routerLink: ['/home/property-demand']
                },
                {
                    label: 'Minhas Demandas',
                    icon: 'pi pi-fw pi-list',
                    routerLink: ['/home/my-demands'],

                }
            ];
        } else {
            this.model = [
                {
                    label: 'Perfil',
                    icon: 'pi pi-fw pi-user',
                    routerLink: ['/profile'],

                },
                {
                    label: 'Todas Demandas',
                    icon: 'pi pi-list',
                    routerLink: ['/home/all-demands']
                }
            ];
        }
    }
}
