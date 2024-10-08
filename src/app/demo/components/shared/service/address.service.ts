import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {StateModel} from "../models/state.model";
import {CityModel} from "../models/city.model";
import {SharedService} from "./shared.service";

@Injectable({
    providedIn: 'root'
})
export class AddressService extends SharedService {

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

    getAllStates(): Observable<StateModel[]> {
        const headers = this.setHeadersForBearer();
        return this.http.get<StateModel[]>(this.apiURL + 'address/states', {headers});
    }

    getFilteredCities(uf: string): Observable<CityModel[]> {
        const headers = this.setHeadersForBearer();
        return this.http.get<CityModel[]>(this.apiURL + 'address/filter-cities/' + uf, {headers});
    }

    getAllStatesBasic(): Observable<StateModel[]> {
        const headers = this.setHeaders();
        return this.http.get<StateModel[]>(this.apiURL + 'new-demand/states', {headers});
    }

    getFilteredCitiesBasic(uf: string): Observable<CityModel[]> {
        const headers = this.setHeaders();
        return this.http.get<CityModel[]>(this.apiURL + 'new-demand/filter-cities/' + uf, {headers});
    }
}
