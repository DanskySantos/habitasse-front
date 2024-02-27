import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandDemoComponent } from './demandcomponent';
import { DemandDemoRoutingModule } from './demand-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';


@NgModule({
	imports: [
		CommonModule,
		DemandDemoRoutingModule,
		FormsModule,
        ReactiveFormsModule,
		ButtonModule
	],
	declarations: [DemandDemoComponent]
})
export class DemandDemoModule { 
}
