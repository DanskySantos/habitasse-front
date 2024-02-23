import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import { CookieService as NgxCookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class AccessService {

    roles: any[] = [];
    private jwtHelper: JwtHelperService = new JwtHelperService();
    private token = this.cookieService.get('token')!;

    constructor(private cookieService: NgxCookieService) {
        this.getRoles();
    }

    private getRoles() {
        this.roles = this.jwtHelper.decodeToken(this.token).authorities;
    }

    hasAccessAutorizacao(): boolean {
        if (this.roles.includes('ROLE_ACCESS_AUTORIZACAO')) {
            return true;
        }
        return false;
    }
 

    hasAccessUsuarios(): boolean {
        if (this.roles.includes('ROLE_ACCESS_USUARIO')) {
            return true;
        }
        return false;
    }
}