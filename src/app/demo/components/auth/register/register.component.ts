import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
	templateUrl: './register.component.html',
	selector: 'button-loading-demo',

})
export class RegisterComponent {
	loading: boolean = false;
	constructor(private layoutService: LayoutService ) {}

	registerForm!: FormGroup;

	load() {
		this.loading = true;
	
		setTimeout(() => {
			this.loading = false
		}, 2000);
	}

	ngOnInit() {
		this.registerForm = new FormGroup({
		   id: new FormControl(''),		
		   name: new FormControl('', [Validators.required]),
		   username: new FormControl('', [Validators.required]),
		   email: new FormControl('', [Validators.required]),
		   password: new FormControl('', [Validators.required]),
		})	
	}

	get name() {
		return this.registerForm.get('name')!;
	}
	
	get username() {
		return this.registerForm.get('username')!;
	}

	get email() {
		return this.registerForm.get('email')!;
	}

	get password() {
		return this.registerForm.get('password')!;
	}

	submit() {
		console.log("Enviou formulario");
	}

	get filledInput(): boolean {
		return this.layoutService.config().inputStyle === 'filled';
	}

}
