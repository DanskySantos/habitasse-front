import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContractTypeEnum} from "../../enums/contract-type-enum";
import {PropertyTypeEnum} from "../../enums/property-type-enum";
import {BedroomsNumberEnum} from "../../enums/bedrooms-number-enum";
import {PetFriendlyEnum} from "../../enums/pet-friendly-enum";
import {FurnishedEnum} from "../../enums/furnished-enum";
import {SuggestedValueRentEnum} from "../../enums/suggested-value-rent-enum";
import {SuggestedValueSaleEnum} from "../../enums/suggested-value-sale-enum";
import {SuggestedValueSeasonalEnum} from "../../enums/suggested-value-seasonal-enum";
import {AddressService} from "../../shared/service/address.service";
import {PropertyDemandService} from "../services/property-demand.service";

@Component({
    templateUrl: './property-demand.component.html',
    selector: 'app-property-demand',

})
export class PropertyDemandComponent implements OnInit {

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
    states?: any;
    cities?: any;
    submited: boolean = false;

    constructor(public layoutService: LayoutService,
                private addressService: AddressService,
                private propertyDemandService: PropertyDemandService) {
        this.startLists();
    }

    ngOnInit() {
        this.createForm();
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
            this.states = states.map(state => state.nome)
        );
    }

    save() {
        this.submited = true;
        this.propertyDemandService.save(this.propertyForm.value)
    }

    filterCities(event: any) {
        this.addressService.getFilteredCities(event.value).subscribe(cities =>
            this.cities = cities.map(city => city.nome)
        );
    }

    private createForm() {
        this.propertyForm = new FormGroup({
            contractType: new FormControl(null, [Validators.required]),
            propertyType: new FormControl(null, [Validators.required]),
            bedroomsNumber: new FormControl(null),
            furnished: new FormControl(null),
            petFriendly: new FormControl(null),
            suggestedValueForRent: new FormControl(null),
            suggestedValueForSale: new FormControl(null),
            suggestedValueForSeasonal: new FormControl(null),
            state: new FormControl(null, [Validators.required]),
            city: new FormControl(null, [Validators.required]),
            annotation: new FormControl(null),
        });
        this.propertyForm.get('contractType')?.valueChanges.subscribe(contractType => {
            this.setValidatorsBasedOnContractType(contractType);
        });
        this.propertyForm.get('propertyType')?.valueChanges.subscribe(propertyType => {
            this.setValidatorsBasedOnPropertyType(propertyType);
        });
    }

    private setValidatorsBasedOnContractType(contractType: string | null) {
        if (contractType === 'Locação') {
            this.propertyForm.get('suggestedValueForRent')?.setValidators([Validators.required]);
        } else {
            this.propertyForm.get('suggestedValueForRent')?.clearValidators();
        }

        if (contractType === 'Venda') {
            this.propertyForm.get('suggestedValueForSale')?.setValidators([Validators.required]);
        } else {
            this.propertyForm.get('suggestedValueForSale')?.clearValidators();
        }

        if (contractType === 'Temporada') {
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

        this.propertyForm.get('bedroomsNumber')?.updateValueAndValidity();
        this.propertyForm.get('furnished')?.updateValueAndValidity();
        this.propertyForm.get('petFriendly')?.updateValueAndValidity();
    }

    get selectedContractType() {
        return this.propertyForm.get('contractType')!;
    }

    get selectedPropertyType() {
        return this.propertyForm.get('propertyType')!;
    }

    get selectedState() {
        return this.propertyForm.get('state')!;
    }

    get selectedCity() {
        return this.propertyForm.get('city')!;
    }

    get selectBedroomsNumber() {
        return this.propertyForm.get('bedroomsNumber')!;
    }

    get selectedFurnished() {
        return this.propertyForm.get('furnished')!;
    }

    get selectedPetFriendly() {
        return this.propertyForm.get('petFriendly')!;
    }

    get selectedSuggestedValueForRent() {
        return this.propertyForm.get('suggestedValueForRent')!;
    }

    get selectedSuggestedValueForSale() {
        return this.propertyForm.get('suggestedValueForSale')!;
    }

    get selectedSuggestedValueForSeasonal() {
        return this.propertyForm.get('suggestedValueForSeasonal')!;
    }

    get annotation() {
        return this.propertyForm.get('annotation')!;
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }
}
