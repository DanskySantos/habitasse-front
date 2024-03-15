import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {StateModel} from "../../auth/models/state.model";
import {SharedService} from "../../shared/service/shared.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PageModel} from "../models/page.model";

@Injectable({
    providedIn: 'root'
})
export class DemandService extends SharedService {

    constructor(private http: HttpClient,
                private toastrService: ToastrService,
                private router: Router,
                private cookieService: NgxCookieService) {
        super();
    }

    setHeadersForBearer() {
        return new HttpHeaders({
            'Authorization': 'Bearer ' + this.cookieService.get('access_token'),
            'Content-Type': 'application/json'
        });
    }

    getDemands(page: number, size: number){
        const headers = this.setHeadersForBearer();
        return this.http.get<PageModel>(`${this.apiURL}demand/findByEmail/${page}/${size}`, {headers})
    }

    deleteDemand(propertyId: number, demandId: number){
        const headers = this.setHeadersForBearer();
        return this.http.delete<any>(`${this.apiURL}propertyDemand/delete/${propertyId}/${demandId}`, {headers}).subscribe(
        )
    }
}
