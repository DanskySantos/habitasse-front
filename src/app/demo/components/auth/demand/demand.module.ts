import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandDemoComponent } from './demandcomponent';
import { DemandDemoRoutingModule } from './demand-routing.module';
 

@NgModule({
	imports: [
		CommonModule,
		DemandDemoRoutingModule
	],
	declarations: [DemandDemoComponent]
})
export class DemandDemoModule { }
