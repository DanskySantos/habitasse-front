import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OffersService} from '../../services/offers.service';
import {DemandModel} from "../../../shared/models/demand.model";
import { SharedService } from '../../../shared/service/shared.service';

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

    constructor(private offersService: OffersService, private sharedService: SharedService) {
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

    Bolean(boolean: any): any {
        return this.sharedService.getBolean(boolean);
    }
    
    formatarData(dataString: string) {
        return this.sharedService.getformatarData(dataString);
    }
    
    BedroomsNumber(bedroomsNumber: any): any {
        return this.sharedService.getBedroomsNumber(bedroomsNumber);
    }
    
    ContractType(contractType: string): any {
        return this.sharedService.getContractType(contractType);
    }
    
    PropertyType(propertyType: string): any {
        return this.sharedService.getPropertyType(propertyType);
    }
    
    Location(address: any): any {
        return this.sharedService.getLocation(address);
    }
    
    Value(propertyDemand: any): any {
        return this.sharedService.getValue(propertyDemand);
    }
    
    ValueForRent(suggestedValueForRent: any): any {
        return this.sharedService.getValueForRent(suggestedValueForRent);
    }
    
    ValueForSale(suggestedValueForSale: any): any {
        return this.sharedService.getValueForSale(suggestedValueForSale);
    }
    
    ForSeasonal(suggestedValueForSeasonal: any): any {
        return this.sharedService.getValueForSeasonal(suggestedValueForSeasonal);
    }
}