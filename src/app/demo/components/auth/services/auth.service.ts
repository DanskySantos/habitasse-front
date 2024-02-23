import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService as NgxCookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Credentials } from 'src/app/demo/components/auth/models/credentials.model';
import { HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();
  http: any;

  constructor(private cookieService: NgxCookieService, private router: Router) { }

  apiURL: string = environment.apiUrl
  tokenURL: string = environment.apiUrl + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();
 

  logout(): void {
    this.cookieService.delete('token');
    this.loggedIn.next(false);
    this.router.navigate(['/auth/login']);
  }

  logins(Credentials: Credentials): Observable<any> {
    const params = new HttpParams()
        .set('email', Credentials.email)
        .set('password', Credentials.password)
        .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers })

  }


  getUsuarioAutenticado() {
    const token = this.cookieService.get('token')
    if( token ) {
      const usuario = this.jwtHelper.decodeToken(token).email
      return usuario
    }
    return null;
  }



  obterTokenUsuario() {
    if(this.cookieService.get('token')) {
      return  this.cookieService.get('token')
    }
     return null;
  }
  
 
  isAutenticated(): boolean {
    const token = this.obterTokenUsuario()
    if( token ) {
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired
    }
    return false;
  }
}

