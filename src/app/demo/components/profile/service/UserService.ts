import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interface/User';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";

@Injectable({
  providedIn: 'root'
})
export class UserService extends SharedService  {

    private apiUrl = 'http://localhost:8080/user/getEmail';

    constructor(private http: HttpClient, private cookieService: NgxCookieService) {
        super();
    }

 

    getHeadersForBearer() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
            'Content-Type': 'application/json'
        });
    }

    getUserProfile(form: any) {
        const headers = this.getHeadersForBearer();
        return this.http.post<User[]>(this.apiURL + 'user/profile', form, {headers});
    }

}
