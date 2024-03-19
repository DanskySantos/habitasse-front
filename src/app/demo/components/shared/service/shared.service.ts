import {Injectable} from '@angular/core';
import {throwError} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    apiURL: string = environment.apiUrl;
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
            'Access-Control-Allow-Origin': 'https://habitasse.netlify.app',
            'Content-Type': 'application/json'
        });
    }
}
