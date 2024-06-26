import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {PageModel} from "../../shared/models/page.model";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OffersService extends SharedService {

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

    createOffers(form: any){
        const headers = this.setHeadersForBearer();
        return this.http.post<any>(this.apiURL + 'offer/save', form, {headers}).subscribe(
            next => {
                this.toastrService.success('Oferta enviada', 'Sucesso')
                location.reload()
            },
            err => {
                this.toastrService.error(err.code, 'Erro ao tentar enviar a oferta')
                console.log('Erro ao tentar enviar a oferta:', err)
            }
        );
    }

    acceptOffer(offerId: number){
        const headers = this.setHeadersForBearer();
        return this.http.put<any>(this.apiURL + 'offer/accept', offerId, {headers});
    }

    
    deleteOffers(offerId: number): Observable<any>{
        const headers = this.setHeadersForBearer();
        return this.http.delete<any>(`${this.apiURL}offer/delete/${offerId}`, {headers});
    }

    editOffers(form: any, offerId: number) {
        const headers = this.setHeadersForBearer();
        return this.http.put<any>(this.apiURL + 'offer/update/' + offerId, form, {headers}).subscribe(
            next => {
                this.toastrService.success('Oferta Editada', 'Sucesso')
                location.reload()
            },
            err => {
                this.toastrService.error(err.code, 'Não foi possivel editar a oferta')
            }
        );
    }


    getOffers(page: number, size: number, demandId: number){
        const headers = this.setHeadersForBearer();
        return this.http.get<PageModel>(`${this.apiURL}offer/findByDemand/${demandId}/${page}/${size}`, {headers})
    }
}
