import {Injectable} from '@angular/core';
import {catchError, finalize, tap} from 'rxjs';
import {Credentials} from 'src/app/demo/components/auth/models/credentials.model';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environments';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterModel} from "../models/register.model";
import {SharedService} from "../../shared/service/SharedService";
import {AuthModel} from "../models/auth.model";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends SharedService {

    apiURL: string = environment.apiUrl;
    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient,
                private router: Router,
                private cookieService: NgxCookieService) {
        super();
    }

    login(credentials: Credentials) {
        const headers = this.setHeaders();
        const body = JSON.stringify(credentials);

        return this.http.post(this.apiURL + 'auth/authenticate', body, {headers})
            .pipe(
                tap(response => {
                    this.setCookies(response);
                    console.log('asdasdas')
                    this.router.navigate(['/property-demand'])
                    return this.actionForSuccess(response);
                }),
                catchError(error => {
                    return this.actionForError(error);
                }),
                finalize(() => {
                    return this.finalAction();
                })
            );
    }

    register(registerModel: RegisterModel) {
        const headers = this.setHeaders();
        const body = JSON.stringify(registerModel);

        return this.http.post(this.apiURL + 'auth/register', body, {headers})
            .pipe(
                tap(response => {
                    this.setCookies(response);
                    console.log('asdasdas')
                    this.router.navigate(['/property-demand'])
                    return this.actionForSuccess(response);
                }),
                catchError(error => {
                    return this.actionForError(error);
                }),
                finalize(() => {
                    return this.finalAction();
                })
            );
    }

    getUsuarioAutenticado() {
        const token = this.cookieService.get('token')
        if (token) {
            return this.jwtHelper.decodeToken(token).email
        }
        return null;
    }

    obterTokenUsuario() {
        var token = this.cookieService.get('access_token')
        if (token) {
            return token
        }
        return null;
    }

    isAutenticated(): boolean {
        const token = this.obterTokenUsuario()
        if (token) {
            const expired = this.jwtHelper.isTokenExpired(token);
            return !expired
        }
        return false;
    }

    setCookies(response: any) {
        const auth = Object.assign(new AuthModel(), response);
        this.cookieService.set('access_token', auth.access_token);
        this.cookieService.set('refresh_token', auth.refresh_token);
        this.cookieService.set('username', auth.username);
        return auth;
    }
}
