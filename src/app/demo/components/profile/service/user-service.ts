import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {StateModel} from "../../shared/models/state.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import { UserModel } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SharedService  {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient,
                private toastrService: ToastrService,
                private router: Router,
                private cookieService: NgxCookieService) {
        super();
    }

    setHeadersForBearer() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
            'Content-Type': 'application/json'
        });
    }

    getUserProfile() {
        const headers = this.setHeadersForBearer();
        return this.http.get<UserModel>(this.apiURL + 'user/profile', {headers});
    }

    updateUserProfile(user: UserModel){
        const headers = this.setHeadersForBearer();
        return this.http.put<UserModel>(this.apiURL + 'user/update/' + user.id, user, {headers}).subscribe(
            next => {
                this.toastrService.success('Alterações Salvas', 'Sucesso')
                this.router.navigate(['/profile'])
            },
            err => {
                this.toastrService.error(err.code, 'Erro')
                console.log('error:', err)
            }
        );
    }

    updateUserPassword(id: number, currentPassword: string, newPassword: string){
        const headers = this.setHeadersForBearer();
        const body = {
          currentPassword: currentPassword,
          newPassword: newPassword
        };

        return this.http.put<any>(this.apiURL + 'user/password/' + id, body,  { headers }).subscribe(
            next => {
                this.toastrService.success('Senha salva', 'Sucesso')
                this.router.navigate(['/profile'])
            },
            err => {
                this.toastrService.error(err.code, 'Erro')
                console.log('error:', err)
            }
        )
    }

    deleteAccount(){
        const headers = this.setHeadersForBearer();
        let id = this.cookieService.get('userId');
        return this.http.delete<any>(this.apiURL + 'user/delete/' + id, { headers }).subscribe(
            next => {
                this.cookieService.deleteAll();
                this.toastrService.success('Conta excluída', 'Sucesso')
                this.router.navigate(['/auth/login'])
            },
            err => {
                this.toastrService.error(err.code, 'Erro')
                console.log('error:', err)
            }
        )
    }
}
