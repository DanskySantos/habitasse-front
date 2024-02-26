import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DemandDemoComponent } from './demandcomponent';
 

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: DemandDemoComponent }
	])],
	exports: [RouterModule]
})
export class DemandDemoRoutingModule { }
