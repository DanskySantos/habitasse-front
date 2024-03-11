import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {StateModel} from "../../auth/models/state.model";
import {SharedService} from "../../shared/service/shared.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})
export class PropertyDemandService extends SharedService {

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

    save(form: any){
        const headers = this.setHeadersForBearer();
        return this.http.post<StateModel[]>(this.apiURL + 'register-demand/save', form, {headers}).subscribe(
            next => {
                this.toastrService.success('Imóvel Cadastrado', 'Sucesso')
                //TODO navegar para tela de minhas demandas
                this.router.navigate(['/home/my-demands'])
            },
            err => {
                this.toastrService.error(err.code, 'Erro')
                console.log('error:', err)
            }
        );
    }
}
