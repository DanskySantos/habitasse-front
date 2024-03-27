import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OffersService} from '../../services/offers.service';


@Component({
    templateUrl: './create-update-offer-modal.component.html',
    selector: 'app-create-update-offer-modal',

})
export class CreateUpdateOfferModalComponent implements OnInit {

    @Input('demandId')
    demandId?: number;

    @Input('offer')
    offer?: any;

    allDemandsOffers!: FormGroup;
    visible: boolean = false;
    loading: boolean = false;
    submited: boolean = false;

    constructor(private offersService: OffersService) {
    }

    ngOnInit() {
        this.createForm();
    }

    createOffers() {
        this.submited = true;
        this.offersService.createOffers(this.allDemandsOffers.value)
    }

    editOffers() {
        this.submited = true;
        this.offersService.editOffers(this.allDemandsOffers.value, this.offer.id)
    }

    saveOffers() {
        if (this.offer) {
            this.editOffers();
        } else {
            this.createOffers();
        }
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    createForm() {
        if (this.offer) {
            this.allDemandsOffers = new FormGroup({
                demandId: new FormControl(this.demandId),
                text: new FormControl(this.offer.text, [Validators.required]),
            });
        } else {
            this.allDemandsOffers = new FormGroup({
                demandId: new FormControl(this.demandId),
                text: new FormControl(null, [Validators.required]),
            });
        }
    }
}
