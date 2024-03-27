import {Injectable} from '@angular/core';
import {catchError, finalize, tap} from 'rxjs';
import {Credentials} from 'src/app/demo/components/shared/models/credentials.model';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {RegisterModel} from "../../shared/models/register.model";
import {AuthModel} from "../../shared/models/auth.model";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {Router} from "@angular/router";
import {SharedService} from "../../shared/service/shared.service";
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class AuthService extends SharedService {

    jwtHelper: JwtHelperService = new JwtHelperService();

    constructor(private http: HttpClient,
                private toastrService: ToastrService,
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
                    this.router.navigate(['/home/property-demand'])
                    return this.actionForSuccess(response);
                }),
                catchError(error => {
                    this.toastrService.error(error.error, 'Erro')
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
                    this.toastrService.success('Registro Concluído', 'Sucesso')
                    this.router.navigate(['/home/property-demand'])
                    return this.actionForSuccess(response);
                }),
                catchError(error => {
                    this.toastrService.error(error.error, 'Erro')
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
        this.cookieService.set('userId', auth.userId);
        return auth;
    }
}
