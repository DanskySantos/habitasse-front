import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-demand-demo',
  templateUrl: './demand.component.html',
})
export class DemandDemoComponent {
    demandForm!: FormGroup;
}
