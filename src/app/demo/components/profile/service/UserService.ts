import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interface/User';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends SharedService  {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient, private cookieService: NgxCookieService) {
        super();
    }


    getHeadersForBearer() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
            'Content-Type': 'application/json'
        });
    }

    getUserProfile() {
        const headers = this.getHeadersForBearer();
        return this.http.get<User>(this.apiURL + 'user/profile', {headers});
    }
    
    updateUserProfile(user: User): Observable<User> {
        const headers = this.getHeadersForBearer();
        return this.http.put<User>(this.apiURL + 'user/profile', { headers });
      }

    updateUserPassword(usernameForDto: string, currentPassword: string, newPassword: string): Observable<User> {
        const headers = this.getHeadersForBearer();
        const body = {
          usernameForDto: usernameForDto,  
          currentPassword: currentPassword,
          newPassword: newPassword
        };
        console.log(body);
        return this.http.put<User>(this.apiURL + `user/password/${usernameForDto}`, body,  { headers });
      }
}
