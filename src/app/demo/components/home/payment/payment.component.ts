import {Component, OnInit} from '@angular/core';
import {PlansEnum} from "../../enums/plans-enum";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';

@Component({
    templateUrl: './payment.component.html',
    selector: 'app-payment'
})
export class PaymentComponent implements OnInit {

    plans?: any[];
    userEmail: string = this.cookieService.get('userEmail');
    userId: string = this.cookieService.get('userId');

    constructor(private cookieService: NgxCookieService) {
        this.plans = Object.values(PlansEnum);
    }

    ngOnInit(): void {
    }

    buyPlan(link: string): void {
        window.open(link, "_blank");
    }
}
