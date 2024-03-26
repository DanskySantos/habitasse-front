import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OffersService } from '../../services/offers.service';
 

@Component({
    templateUrl: './all-demands-modal.component.html',
    selector: 'app-all-demands-modal',

})
export class AllDemandsModalComponent implements OnInit {
    @Input('demandId')
    demandId?: number;
    
    allDemandsOffers!: FormGroup;
    visible: boolean = false;
    loading: boolean = false;
    submited: boolean = false;

    constructor(private offersService: OffersService){}

    ngOnInit() {
        this.createForm();
    }
  
    CreateDemand() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    CreateOffers() {
        this.submited = true;
        this.offersService.CreateOffers(this.allDemandsOffers.value)
    }

    saveOffers() {
        this.CreateOffers();    
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    createForm() {
        this.allDemandsOffers = new FormGroup({
            demandId: new FormControl(this.demandId),            
            text: new FormControl(null, [Validators.required]),
        });
    }

    setValidatorsBasedOnContractType(contractType: any) {
        throw new Error('Method not implemented.');
    }

    get selectedOffers() {
        return this.allDemandsOffers.get('text')!;
    }
}
