import {Component, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {UserService} from "./service/user-service";
import {UserModel} from "./models/user.model";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    userData?: UserModel;
    showUserUpdate: boolean = false;
    showUserPassword: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router,
        private toastrService: ToastrService) {
        this.getUserProfile();
    }

    ngOnInit() {
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

    navigateToUpdateProfile() {
        this.showUserUpdate = true;
    }

    navigateToUpdatePassword() {
        this.showUserPassword = true;
    }
}
