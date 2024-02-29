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
                label: 'Dashboard', icon: 'pi pi-home',
                items: [
                    { label: 'SaaS', icon: 'pi pi-desktop', routerLink: ['/'] },
                    { label: 'Sales', icon: 'pi pi-chart-bar', routerLink: ['/dashboard-sales'] }
                ]
            },
            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing'],
                        data: {'fullPage': true}
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'Register',
                                icon: 'pi pi-fw pi-user-plus',
                                routerLink: ['/auth/register'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'Forgot Password',
                                icon: 'pi pi-fw pi-question',
                                routerLink: ['/auth/forgotpassword'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'New Password',
                                icon: 'pi pi-fw pi-cog',
                                routerLink: ['/auth/newpassword'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'Verification',
                                icon: 'pi pi-fw pi-envelope',
                                routerLink: ['/auth/verification'],
                                data: {'fullPage': true}
                            },
                            {
                                label: 'Lock Screen',
                                icon: 'pi pi-fw pi-eye-slash',
                                routerLink: ['/auth/lockscreen'],
                                data: {'fullPage': true}
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Invoice',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['/pages/invoice']
                    },
                    {
                        label: 'About Us',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['/pages/aboutus']
                    },
                    {
                        label: 'Help',
                        icon: 'pi pi-fw pi-question-circle',
                        routerLink: ['/pages/help']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                    {
                        label: 'FAQ',
                        icon: 'pi pi-fw pi-question',
                        routerLink: ['/pages/faq']
                    },
                    {
                        label: 'Contact Us',
                        icon: 'pi pi-fw pi-phone',
                        routerLink: ['/pages/contact']
                    }
                ]
            }
        ];
    }
}
