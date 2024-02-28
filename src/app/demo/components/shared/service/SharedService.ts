import {Injectable} from '@angular/core';
import {throwError} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environments";
import {AuthModel} from "../../auth/models/auth.model";
import {CookieService as NgxCookieService} from "ngx-cookie-service/lib/cookie.service";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    clientID: string = environment.clientId;
    clientSecret: string = environment.clientSecret;
    cookieService!: NgxCookieService

    constructor() {
    }

    actionForSuccess(response: any) {
        return response;
    }

    actionForError(error: any) {
        return throwError(error);
    }

    finalAction() {
        return;
    }

    setHeaders() {
        return new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
            'Content-Type': 'application/json'
        });
    }

    setCookies(response: any) {
        const auth = Object.assign(new AuthModel(), response);
        this.cookieService.set('access_token', auth.access_token);
        this.cookieService.set('refresh_token', auth.refresh_token);
        this.cookieService.set('username', auth.username);
        return auth;
    }
}
