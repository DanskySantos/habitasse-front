import {Component, Input, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DemandService } from '../../services/demand.service';
import { DemandModel } from '../../../shared/models/demand.model';
import { UserModel } from '../../../shared/models/user.model';
import { OffersModel } from '../../../shared/models/offers.model';
import { OffersService } from '../../services/offers.service';
 

@Component({
    templateUrl: './all-demands-modal.component.html',
    selector: 'app-all-demands-modal',

})
export class AllDemandsModalComponent implements OnInit {
    @Input() allDemand: any;

    @Input('userData')
    userData?: UserModel; 
  
    @Input('DemandModel')
    OffersData ?: DemandModel; 

    allDemandsOffers!: FormGroup;
    visible: boolean = false;
    loading: boolean = false;
    submited: boolean = false;

    proposal?: string;
    idUser?: number;
    idDemand?: number;

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
            idUser: new FormControl(this.userData?.id, [Validators.required]),
            idDemand: new FormControl(this.OffersData?.id, [Validators.required]),                
            proposal: new FormControl(null, [Validators.required]),
        });
        this.allDemandsOffers.get('proposal')?.valueChanges.subscribe(proposal => {
            this.setValidatorsBasedOnContractType(proposal);
        });
    }

    setValidatorsBasedOnContractType(contractType: any) {
        throw new Error('Method not implemented.');
    }

    get selectedProposal() {
        return this.allDemandsOffers.get('proposal')!;
    }
}
