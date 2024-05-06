import {Injectable} from '@angular/core';
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

    async login(credentials: Credentials) {
        this.deleteCookies();
        const headers = this.setHeaders();
        const body = JSON.stringify(credentials);

        this.http.post(this.apiURL + 'auth/authenticate', body, {headers}).subscribe(
            async (response: any) => {
                await this.setCookies(response.body)
                this.toastrService.success('Login Concluído', 'Sucesso')
                const model = Object.assign(new AuthModel(), response.body);
                await this.navigate(model.userRole);
            },
            error => {
                this.toastrService.error(error.error, 'Erro')
                console.error('Error', error);
            }
        );
    }

    async register(registerModel: RegisterModel) {
        this.deleteCookies();
        const headers = this.setHeaders();
        const body = JSON.stringify(registerModel);

        this.http.post(this.apiURL + 'auth/register', body, {headers}).subscribe(
            async response => {
                await this.setCookies(response);
                this.toastrService.success('Registro Concluído', 'Sucesso')
                const model = Object.assign(new AuthModel(), response);
                await this.navigate(model.userRole);
            },
            error => {
                this.toastrService.error(error.error, 'Erro')
                console.error('Error', error.error);
            });
    }

    async navigate(userRole: any) {
        if (userRole === 'USER_CO') {
            await this.router.navigateByUrl('/home/all-demands')
        } if (userRole === 'USER_CD') {
            await this.router.navigateByUrl('/home/my-demands')
        }
    }

    deleteCookies() {
        this.cookieService.deleteAll();
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

    async setCookies(response: any) {
        const auth = Object.assign(new AuthModel(), response);
        this.cookieService.set('access_token', auth.access_token);
        this.cookieService.set('refresh_token', auth.refresh_token);
        this.cookieService.set('username', auth.username);
        this.cookieService.set('userId', auth.userId);
        this.cookieService.set('userRole', auth.userRole);
        return auth;
    }
}
