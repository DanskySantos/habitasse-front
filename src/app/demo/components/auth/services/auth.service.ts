import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, Observable, throwError} from 'rxjs';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {Credentials} from 'src/app/demo/components/auth/models/credentials.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environments';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterModel} from "../models/register.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    isLoggedIn$ = this.loggedIn.asObservable();

    constructor(private cookieService: NgxCookieService,
                private router: Router,
                private http: HttpClient) {
    }

    apiURL: string = environment.apiUrl
    url: string = environment.apiUrl;
    clientID: string = environment.clientId;
    clientSecret: string = environment.clientSecret;
    jwtHelper: JwtHelperService = new JwtHelperService();

    loginSuccess(token: string): void {
        this.cookieService.set('token', token);
        this.loggedIn.next(true);
        console.log('Login bem-sucedido');
        this.router.navigate(['/']);
    }

    loginFailed(): void {
        this.cookieService.delete('token');
        this.loggedIn.next(false);
        console.error('Erro durante o login');
        this.router.navigate(['/auth/login']);
    }

    logout(): void {
        this.cookieService.delete('token');
        this.loggedIn.next(false);
        this.router.navigate(['/auth/login']);
    }

    login(credentials: Credentials): Observable<any> {
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
            'Content-Type': 'application/json'
        });

        const body = JSON.stringify(credentials);

        return this.http.post(this.url + 'auth/authenticate', body, {headers});
    }

    register(registerModel: RegisterModel) {
        const headers = new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
            'Content-Type': 'application/json' // alterado para application/json
        });

        const body = JSON.stringify(registerModel);

        return this.http.post(this.url + 'auth/register', body, { headers })
            .pipe(
                catchError(this.handlerError)
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
