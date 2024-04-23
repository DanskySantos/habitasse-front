import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from '../../shared/service/shared.service';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService extends SharedService {

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

    uploadFiles(file: File): Observable<any> {
        const headers = this.setHeadersForBearer();
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(this.apiURL + 'files/upload', formData, { headers });
    }
}
