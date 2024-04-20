import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    private jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private cookieService: NgxCookieService) {
    }

    hasAccessCD(): boolean {
        if (this.jwtHelper.decodeToken(this.cookieService.get('access_token')!).authorities.includes('ROLE_USER_CD')) {
            return true;
        } else {
            return false;
        }
    }

    hasAccessCO(): boolean {
        if (this.jwtHelper.decodeToken(this.cookieService.get('access_token')!).authorities.includes('ROLE_USER_CO')) {
            return true;
        } else {
            return false;
        }
    }
}
