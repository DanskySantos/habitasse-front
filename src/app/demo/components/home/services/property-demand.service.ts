import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {StateModel} from "../../auth/models/state.model";
import {CityModel} from "../../auth/models/city.model";
import {SharedService} from "../../shared/service/shared.service";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class PropertyDemandService extends SharedService {

    constructor(private http: HttpClient,
                private cookieService: NgxCookieService) {
        super();
    }

    setHeadersForBearer() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
            'Content-Type': 'application/json'
        });
    }

    save(form: any) {
        const headers = this.setHeadersForBearer();
        return this.http.post<StateModel[]>(this.apiURL + 'address/save', form, {headers});
    }
}
