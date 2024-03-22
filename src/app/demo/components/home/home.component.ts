import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthService} from '../auth/services/auth.service';
import {UserService} from "../profile/service/user-service";
import {UserModel} from "../shared/models/user.model";


@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    userData?: UserModel;
    loading: boolean = false;

    constructor(private userService: UserService) {
        this.getUserProfile();
    }

    getUserProfile() {
        this.userService.getUserProfile().subscribe(
            data => {
                this.userData = data;
                console.log(data)
                if (this.userData && this.userData.birthday) {
                    this.userData.birthday = this.formatarData(this.userData.birthday);
                }
            },
            error => {
                console.error('Error', error);
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

    ngOnInit() {
    }
}
