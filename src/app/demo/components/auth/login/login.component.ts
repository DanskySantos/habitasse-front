import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';


@Component({
	templateUrl: './login.component.html'
})
export class LoginComponent {
	email: string = '';
	password: string = '';

	constructor(private layoutService: LayoutService, private http: HttpClient) {}

	get filledInput(): boolean {
		return this.layoutService.config().inputStyle === 'filled';
	}

	
	login() {
		const credentials = { email: this.email, password: this.password };
		const url = 'http://localhost:8080/authenticate';
		const headers = new HttpHeaders().set('Content-Type', 'application/json');

		this.http.post(url, credentials, { headers })
			.pipe(
				catchError((error) => {
					
					console.error('Erro durante o login', error);
					return throwError(error);
				})
			)
			.subscribe(
				(response) => {
					console.log('Login bem-sucedido', response);
				}
			);
	}

}
