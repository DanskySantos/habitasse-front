import {Injectable} from '@angular/core';
import {catchError, finalize, Observable, tap, throwError} from 'rxjs';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {Credentials} from 'src/app/demo/components/auth/models/credentials.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from 'src/environments/environments';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterModel} from "../models/register.model";
import {SharedService} from "../../shared/service/SharedService";
import {AuthModel} from "../models/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends SharedService {

    constructor(private cookieService: NgxCookieService,
                private http: HttpClient) {
        super();
    }

    apiURL: string = environment.apiUrl
    jwtHelper: JwtHelperService = new JwtHelperService();

    login(credentials: Credentials): Observable<any> {
        const headers = this.setHeaders();
        const body = JSON.stringify(credentials);

        return this.http.post(this.apiURL + 'auth/authenticate', body, {headers}).pipe(
            tap(response => {
                var auth = Object.assign(new AuthModel(), response);
                this.cookieService.set('access_token', auth.access_token);
                this.cookieService.set('refresh_token', auth.refresh_token);
                this.cookieService.set('username', auth.username);
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

        return this.http.post(this.apiURL + 'auth/register', body, {headers}).pipe(
                tap(response => {
                    var auth = Object.assign(new AuthModel(), response);
                    this.cookieService.set('access_token', auth.access_token);
                    this.cookieService.set('refresh_token', auth.refresh_token);
                    this.cookieService.set('username', auth.username);
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
            const usuario = this.jwtHelper.decodeToken(token).email
            return usuario
        }
        return null;
    }

    obterTokenUsuario() {
        if (this.cookieService.get('token')) {
            return this.cookieService.get('token')
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

    private handlerError(error: any): Observable<any> {
        console.log("Error na requisiçao => ", error);
        return throwError(error);
    }
}
