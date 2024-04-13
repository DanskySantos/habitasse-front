import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PageModel} from "../../shared/models/page.model";
import { UserModel } from '../../shared/models/user.model';
import { PropertyDemandModel } from '../../shared/models/property-demand.model';

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

    getFilteredDemands(page: number, size: number, filter: any){
        const headers = this.setHeadersForBearer();
        return this.http.post<PageModel>(`${this.apiURL}demand/filter/${page}/${size}`, filter, {headers})
    }

    deleteDemand(propertyId: number, demandId: number){
        const headers = this.setHeadersForBearer();
        return this.http.delete<any>(`${this.apiURL}propertyDemand/delete/${propertyId}/${demandId}`, {headers})
    }

    updateUserProfile(user: UserModel){
        const headers = this.setHeadersForBearer();
        return this.http.put<UserModel>(this.apiURL + 'user/update/' + user.id, user, {headers}).subscribe(
            next => {
                this.toastrService.success('Alterações Salvas', 'Sucesso')
                this.router.navigate(['/profile'])
            },
            err => {
                this.toastrService.error(err.code, 'Não foi possivel salvar as alterações')
            }
        );
    }


    updateDemand(demand: PropertyDemandModel){
        const headers = this.setHeadersForBearer();
        return this.http.put<PropertyDemandModel>(this.apiURL + 'propertyDemand/update/' + demand.id, demand, {headers}).subscribe(
            next => {
                this.toastrService.success('Alterações Salvas', 'Sucesso')
                location.reload();
            },
            err => {
                this.toastrService.error(err.code, 'Não foi possivel editar a demanda')
            }
        );
    }
}
