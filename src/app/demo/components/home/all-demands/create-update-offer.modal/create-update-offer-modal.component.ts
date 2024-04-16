import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OffersService} from '../../services/offers.service';
import {DemandModel} from "../../../shared/models/demand.model";
import {OffersModel} from "../../../shared/models/offers.model";

@Component({
    templateUrl: './create-update-offer-modal.component.html',
    selector: 'app-create-update-offer-modal',

})
export class CreateUpdateOfferModalComponent implements OnInit {

    @Input('demand')
    demand!: DemandModel;

    @Input('offer')
    offer?: any;

    allDemandsOffers!: FormGroup;
    visible: boolean = false;
    loading: boolean = false;
    submited: boolean = false;

    constructor(protected offersService: OffersService) {
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
                demandId: new FormControl(this.demand?.id),
                text: new FormControl(this.offer.text, [Validators.required]),
            });
        } else {
            this.allDemandsOffers = new FormGroup({
                demandId: new FormControl(this.demand?.id),
                text: new FormControl(null, [Validators.required]),
            });
        }
    }

    getButtonLabel(offer: OffersModel) {
        if (offer == null)
            return 'Fazer proposta'
        if (offer.deleted === false)
            return 'Editar proposta'
        if (offer.deleted === true)
            return 'Reenviar proposta'

        return null;
    }
}
