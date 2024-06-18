import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserService} from "./service/user-service";
import {Router} from "@angular/router";
import {UserModel} from '../shared/models/user.model';
import {DeleteUserModalComponent} from "./delete-user-modal/delete-user-modal.component";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    userData?: UserModel;
    showUserUpdate: boolean = false;
    showUserPassword: boolean = false;
    isCO: boolean = this.cookieService.get('userRole') === 'USER_CO';

    constructor(
        private userService: UserService,
        private router: Router,
        private toastrService: ToastrService,
        private cookieService: NgxCookieService) {
        this.getUserProfile();
    }

    ngOnInit() {
    }

    modalExcluir(modaldelete: DeleteUserModalComponent) {
        modaldelete.visible = true;
    }

    getUserProfile() {
        this.userService.getUserProfile().subscribe(
            data => {
                this.userData = data;
                if (this.userData && this.userData.birthday) {
                    this.userData.birthday = this.formatarData(this.userData.birthday);
                }
            },
            error => {
                console.error('Erro ao obter o perfil do usuário: ', error);
            }
        )
    }

    formatarData(data: string): string {
        const dataNascimento = new Date(data);
        return dataNascimento.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    hideUserUpdate($event: UserModel) {
        this.userData = $event
        this.showUserUpdate = false;
    }

    navigateToUpdateProfile() {
        this.showUserUpdate = true;
    }

    hideUserPassword($event: any) {
        this.userData!.password = $event.newPassword;
        this.showUserPassword = false;
    }

    navigateToUpdatePassword() {
        this.showUserPassword = true;
    }
}
