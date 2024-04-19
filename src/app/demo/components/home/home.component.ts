import {AfterViewInit, Component} from '@angular/core';
import {UserService} from "../profile/service/user-service";
import {UserModel} from "../shared/models/user.model";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {catchError, finalize, of} from "rxjs";

@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements AfterViewInit {

    userData?: UserModel;
    loading: boolean = false;

    constructor(private userService: UserService,
                private router: Router,
                private ngxUiLoaderService: NgxUiLoaderService) {
    }

    ngAfterViewInit(): void {
        this.getUserProfile();
    }

    getUserProfile() {
        this.ngxUiLoaderService.start();

        this.userService.getUserProfile().pipe(
            catchError((error) => {
                console.error('Error', error);
                return of(null); // Retorna um Observable nulo para continuar o fluxo
            }),
            finalize(() => {
                this.ngxUiLoaderService.stop();
            })
        ).subscribe((data) => {
            if (data) {
                this.getHomePage(data.demandsQuantity, data.role);
                this.userData = data;
                if (this.userData && this.userData.birthday) {
                    this.userData.birthday = this.formatarData(this.userData.birthday);
                }
            }
        });
    }

    formatarData(data: string): string {
        const dataNascimento = new Date(data);
        return dataNascimento.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    getHomePage(demandsQuantity: number, role: string) {
        if (demandsQuantity > 0 && role === 'USER_CD')
            return this.router.navigate(['home/my-demands'])
        if (demandsQuantity === 0 && role === 'USER_CD')
            return this.router.navigate(['home/property-demand'])
        if (role === 'USER_CO')
            return this.router.navigate(['home/all-demands'])
        return;
    }
}
