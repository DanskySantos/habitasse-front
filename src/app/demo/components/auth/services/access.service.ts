import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    roles: any[] = [];
    private jwtHelper: JwtHelperService = new JwtHelperService();
    private token = this.cookieService.get('access_token')!;

    constructor(private cookieService: NgxCookieService) {
        this.getRoles();
    }

    private getRoles() {
        this.roles = this.jwtHelper.decodeToken(this.token).authorities;
    }

    hasAccessCD(): boolean {
        if (this.roles.includes('ROLE_USER_CD')) {
            return true;
        } else {
            return false;
        }
    }

    hasAccessCO(): boolean {
        if (this.roles.includes('ROLE_USER_CO')) {
            return true;
        } else {
            return false;
        }
    }
}
