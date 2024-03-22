import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Cadastro de Demandas', icon: 'pi pi-home',
                routerLink: ['/home']
            },
            {
                label: 'Minhas Demandas',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/home/my-demands'],
              
            }
        ];
    }
}
