import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import {StateModel} from "../../auth/models/state.model";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

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

    updateUserPassword(usernameForDto: string, currentPassword: string, newPassword: string): Observable<UserModel> {
        const headers = this.setHeadersForBearer();
        const body = {
          usernameForDto: usernameForDto,
          currentPassword: currentPassword,
          newPassword: newPassword
        };
        return this.http.put<UserModel>(this.apiURL + `user/password/${usernameForDto}`, body,  { headers });
      }
}
