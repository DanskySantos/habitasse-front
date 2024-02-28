import {Injectable} from '@angular/core';
import {throwError} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environments";
import {CookieService as NgxCookieService} from "ngx-cookie-service/lib/cookie.service";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    clientID: string = environment.clientId;
    clientSecret: string = environment.clientSecret;

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
}
