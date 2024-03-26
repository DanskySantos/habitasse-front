import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {SharedService} from "../../shared/service/shared.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

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


    CreateOffers(form: any){
        const headers = this.setHeadersForBearer();
        return this.http.post<any[]>(this.apiURL + '/offers', form, {headers}).subscribe(
            next => {
                this.toastrService.success('Proposta enviada', 'Sucesso')
                this.router.navigate(['/home/all-demands'])
            },
            err => {
                this.toastrService.error(err.code, 'Erro')
                console.log('error:', err)
            }
        );
    }

}
