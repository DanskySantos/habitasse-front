import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';
import { OffersModel } from '../../../shared/models/offers.model';
 

@Component({
    templateUrl: './my-offer-modal.component.html',
    selector: 'app-offer-modal',

})
export class ListOfferComponent implements OnInit {

    @Input('listOffer')
    listOffer?: OffersModel;

    loading: boolean = false;
    visible: boolean = false;
 
    constructor(public layoutService: LayoutService,
                private toastrService: ToastrService,
                private router: Router) {
    }
 
    ngOnInit(): void {
    }
 
    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }
}
