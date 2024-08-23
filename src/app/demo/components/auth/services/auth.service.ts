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
import {VerificationModel} from "../../shared/models/verification.model";

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
                await this.router.navigateByUrl('/auth/verification')
            },
            error => {
                this.toastrService.error(error.error, 'Erro')
                console.error('Error', error.error);
            });
    }

    async registerNewUser(registerModel: RegisterModel) {
        console.log(registerModel)
        this.deleteCookies();
        const headers = this.setHeaders();
        const body = JSON.stringify(registerModel);

        this.http.post(this.apiURL + 'auth/registerNewUser', body, {headers}).subscribe(
            async response => {
                await this.setCookies(response);
                this.toastrService.success('Registro Concluído', 'Sucesso')
                const model = Object.assign(new AuthModel(), response);
                await this.router.navigateByUrl('/auth/verification')
            },
            error => {
                this.toastrService.error(error.error, 'Erro')
                console.error('Error', error.error);
            });
    }

    async authorizeAccount(verificationModel: VerificationModel) {
        const headers = this.setHeaders();
        const body = JSON.stringify(verificationModel);

        this.http.post(this.apiURL + 'auth/authorize-account', body, {headers}).subscribe(
            async response => {
                this.toastrService.success('Conta Autorizada', 'Sucesso')
                const model = Object.assign(new AuthModel(), response);
                this.cookieService.delete('isAccountConfirmed');
                this.cookieService.set('isAccountConfirmed', String(model.isAccountConfirmed));
                await this.navigate(this.cookieService.get('userRole'));
            },
            error => {
                this.toastrService.error(error.error, 'Código Inválido')
                console.error('Error', error);
            }
        );
    }

    async resendCode(email: string) {
        const headers = this.setHeaders();

        this.http.post(this.apiURL + 'auth/resend-code', email, {headers}).subscribe(
            async response => {
                this.toastrService.success('Código enviado novamente', 'Sucesso')
                const model = Object.assign(new AuthModel(), response);
                this.cookieService.delete('isAccountConfirmed');
                this.cookieService.set('isAccountConfirmed', String(model.isAccountConfirmed));
                await this.navigate(this.cookieService.get('userRole'));
            },
            error => {
                this.toastrService.error(error.error, 'Ocorreu um erro inesperado')
                console.error('Error', error);
            }
        );
    }

    async navigate(userRole: any) {
        setTimeout(() => {
            if (userRole === 'USER_CO') {
                this.router.navigateByUrl('/home/all-demands')
            }
            if (userRole === 'USER_CD') {
                this.router.navigateByUrl('/home')
            }
        }, 2000);
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

    isAccountConfirmed(): boolean {
        if (this.cookieService.get('isAccountConfirmed') === 'true') {
            return true;
        } else {
            return false;
        }
    }

    async setCookies(response: any) {
        this.cookieService.deleteAll();
        const auth = Object.assign(new AuthModel(), response);
        this.cookieService.set('access_token', auth.access_token);
        this.cookieService.set('refresh_token', auth.refresh_token);
        this.cookieService.set('username', auth.username);
        this.cookieService.set('userId', auth.userId);
        this.cookieService.set('userRole', auth.userRole);
        this.cookieService.set('remainingDays', String(response.remainingDays));
        this.cookieService.set('isAccountConfirmed', auth.isAccountConfirmed);
        return auth;
    }
}
