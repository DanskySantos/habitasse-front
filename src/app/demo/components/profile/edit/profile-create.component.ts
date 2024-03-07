import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import { UserService } from '../service/UserService';
import { User } from '../interface/User';
import { FormGroup } from '@angular/forms';

@Component({
    templateUrl: './profile-create.component.html'
})
export class ProfileCreateComponent implements OnInit {

  loading: boolean = false;
  propertyForm!: FormGroup;
 
  userData: User = {
    name: '',
    usernameForDto: '',
    email: '',
    birthdate: '',
    person: {  
      name: '',
      birthday: '',
      phone: '',
    }
  };

    constructor(private userService: UserService, ) {}

    ngOnInit() {
      this.getUserProfile();
    }

    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }

    load() {
      this.loading = true;

      setTimeout(() => {
          this.loading = false;
      }, 2000);
  }


    getUserProfile() {
      this.userService.getUserProfile().subscribe(
        (data: User) => {
          this.userData = data;
          if (this.userData.person && this.userData.person.birthday) {
            this.userData.person.birthday = this.formatarData(this.userData.person.birthday);
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

    updateUserProfile() {
      this.loading = true;
      this.userService.updateUserProfile(this.userData).subscribe(
        (data: User) => {
          this.loading = false;
          console.log('Perfil do usuário atualizado com sucesso: ', data);
        },
        (error: any) => {
          this.loading = false;
          console.error('Erro ao atualizar o perfil do usuário: ', error);
        }
      );
    }

}
