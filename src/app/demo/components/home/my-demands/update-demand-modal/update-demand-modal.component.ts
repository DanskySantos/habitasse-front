import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AddressService} from '../../../shared/service/address.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContractTypeEnum} from '../../../enums/contract-type-enum';
import {BedroomsNumberEnum} from '../../../enums/bedrooms-number-enum';
import {PropertyTypeEnum} from '../../../enums/property-type-enum';
import {PetFriendlyEnum} from '../../../enums/pet-friendly-enum';
import {FurnishedEnum} from '../../../enums/furnished-enum';
import {SuggestedValueRentEnum} from '../../../enums/suggested-value-rent-enum';
import {SuggestedValueSaleEnum} from '../../../enums/suggested-value-sale-enum';
import {SuggestedValueSeasonalEnum} from '../../../enums/suggested-value-seasonal-enum';
import {DemandService} from '../../services/demand.service';
import {DemandModel} from '../../../shared/models/demand.model';

@Component({
    templateUrl: './update-demand-modal.component.html',
    selector: 'app-update-demand-modal',

})
export class UpdateDemandModalComponent implements OnInit {

    @Input('demandData')
    demandData?: DemandModel;

    page: number = 0;
    size: number = 4;
    first: number = 0;
    visibleEdit: boolean = false;
    propertyForm!: FormGroup;
    loading: boolean = false;
    contractType?: string[];
    propertyType?: string[];
    bedroomsNumber?: string[];
    furnished?: string[];
    petFriendly?: string[];
    suggestedValueForRent?: string[];
    suggestedValueForSale?: string[];
    suggestedValueForSeasonal?: string[];
    state?: any;
    city?: any;
    submited: boolean = false;

    constructor(public layoutService: LayoutService,
                private addressService: AddressService,
                protected demandService: DemandService) {
        this.startLists();
    }

    ngOnInit() {
        this.createForm();
        this.addressService.getFilteredCities(this.demandData!.propertyDemand!.address!.state!).subscribe(cities =>
            this.city = cities.map(city => city.nome)
        );
    }

    startLists() {
        this.contractType = Object.values(ContractTypeEnum);
        this.bedroomsNumber = Object.values(BedroomsNumberEnum);
        this.propertyType = Object.values(PropertyTypeEnum);
        this.petFriendly = Object.values(PetFriendlyEnum);
        this.furnished = Object.values(FurnishedEnum);
        this.suggestedValueForRent = Object.values(SuggestedValueRentEnum);
        this.suggestedValueForSale = Object.values(SuggestedValueSaleEnum);
        this.suggestedValueForSeasonal = Object.values(SuggestedValueSeasonalEnum);

        this.addressService.getAllStates().subscribe(states =>
            this.state = states.map(state => state.nome)
        );
    }

    createForm() {
        this.propertyForm = new FormGroup({
            id: new FormControl(this.demandData?.id, [Validators.required]),
            contractType: new FormControl(this.demandService.getContractType(this.demandData!.propertyDemand!.contractType), [Validators.required]),
            propertyType: new FormControl(this.demandService.getPropertyType(this.demandData!.propertyDemand!.propertyType), [Validators.required]),
            bedroomsNumber: new FormControl(this.demandService.getBedroomsNumber(this.demandData!.propertyDemand!.bedroomsNumber ? this.demandData!.propertyDemand!.bedroomsNumber : '')),
            furnished: new FormControl(this.demandService.getBoolean(this.demandData!.propertyDemand!.furnished ? this.demandData!.propertyDemand!.furnished : '')),
            petFriendly: new FormControl(this.demandService.getBoolean(this.demandData!.propertyDemand!.petFriendly ? this.demandData!.propertyDemand!.petFriendly : '')),
            suggestedValueForRent: new FormControl(this.demandService.getValueForRent(this.demandData!.propertyDemand!.suggestedValueForRent ? this.demandData!.propertyDemand!.suggestedValueForRent : '')),
            suggestedValueForSale: new FormControl(this.demandService.getValueForSale(this.demandData!.propertyDemand!.suggestedValueForSale ? this.demandData!.propertyDemand!.suggestedValueForSale : '')),
            suggestedValueForSeasonal: new FormControl(this.demandService.getValueForSeasonal(this.demandData!.propertyDemand!.suggestedValueForSeasonal ? this.demandData!.propertyDemand!.suggestedValueForSeasonal : '')),
            state: new FormControl(this.demandData!.propertyDemand!.address!.state, [Validators.required]),
            city: new FormControl(this.demandData!.propertyDemand!.address!.city, [Validators.required]),
            annotation: new FormControl(this.demandData!.annotation ? this.demandData!.annotation : ''),
        });
        this.propertyForm.get('contractType')?.valueChanges.subscribe(contractType => {
            this.setValidatorsBasedOnContractType(contractType);
        });
        this.propertyForm.get('propertyType')?.valueChanges.subscribe(propertyType => {
            this.setValidatorsBasedOnPropertyType(propertyType);
        });
        this.propertyForm.markAllAsTouched()
    }

    filterCities(event: any) {
        this.addressService.getFilteredCities(event.value).subscribe(cities =>
            this.city = cities.map(city => city.nome)
        );
    }

    updateDemand() {
        this.submited = true;
        this.demandService.updateDemand(this.propertyForm.value)
    }

    update() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
        this.updateDemand();
    }

    private setValidatorsBasedOnContractType(contractType: string | null) {
        if (contractType === 'Locação') {
            this.propertyForm.get('suggestedValueForSale')?.reset();
            this.propertyForm.get('suggestedValueForSeasonal')?.reset();
            this.propertyForm.get('suggestedValueForRent')?.setValidators([Validators.required]);
        } else {
            this.propertyForm.get('suggestedValueForRent')?.clearValidators();
        }

        if (contractType === 'Venda') {
            this.propertyForm.get('suggestedValueForRent')?.reset();
            this.propertyForm.get('suggestedValueForSeasonal')?.reset();
            this.propertyForm.get('suggestedValueForSale')?.setValidators([Validators.required]);
        } else {
            this.propertyForm.get('suggestedValueForSale')?.clearValidators();
        }

        if (contractType === 'Temporada') {
            this.propertyForm.get('suggestedValueForRent')?.reset();
            this.propertyForm.get('suggestedValueForSale')?.reset();
            this.propertyForm.get('suggestedValueForSeasonal')?.setValidators([Validators.required]);
        } else {
            this.propertyForm.get('suggestedValueForSeasonal')?.clearValidators();
        }

        this.propertyForm.get('suggestedValueForRent')?.updateValueAndValidity();
        this.propertyForm.get('suggestedValueForSale')?.updateValueAndValidity();
        this.propertyForm.get('suggestedValueForSeasonal')?.updateValueAndValidity();
    }

    private setValidatorsBasedOnPropertyType(propertyType: string | null) {
        if (propertyType !== 'Loteamento') {
            this.propertyForm.get('bedroomsNumber')?.setValidators([Validators.required]);
            this.propertyForm.get('furnished')?.setValidators([Validators.required]);
            this.propertyForm.get('petFriendly')?.setValidators([Validators.required]);
        } else {
            this.propertyForm.get('bedroomsNumber')?.clearValidators();
            this.propertyForm.get('furnished')?.clearValidators();
            this.propertyForm.get('petFriendly')?.clearValidators();
        }

        this.propertyForm.get('bedroomsNumber')?.reset()
        this.propertyForm.get('furnished')?.reset()
        this.propertyForm.get('petFriendly')?.reset()
        this.propertyForm.get('bedroomsNumber')?.updateValueAndValidity();
        this.propertyForm.get('furnished')?.updateValueAndValidity();
        this.propertyForm.get('petFriendly')?.updateValueAndValidity();
    }

    get selectedContractType() {
        return this.propertyForm.get('contractType')!;
    }

    get selectedPropertyType() {
        return this.propertyForm.get('propertyType')!.value;
    }
}
