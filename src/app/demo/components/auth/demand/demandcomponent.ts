import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demand-demo',
  templateUrl: './demand.component.html',
})
export class DemandDemoComponent {
  demandForm!: FormGroup; 


  constructor(private router: Router) {
    this.demandForm = new FormGroup({});
  }
   

  redirectToRegister(userRoles: string) {
    this.router.navigate(['/auth/register'], { queryParams: { type: userRoles } });
  }
    
}
