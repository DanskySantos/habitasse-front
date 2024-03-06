import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
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

    value!: string;
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
        console.log(this.propertyForm.value)
        this.propertyDemandService.save(this.propertyForm.value).subscribe();
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
            bedroomsNumber: new FormControl(null, [Validators.required]),
            furnished: new FormControl(null, [Validators.required]),
            petFriendly: new FormControl(null, [Validators.required]),
            suggestedValueForRent: new FormControl(null, [this.valueValidator]),
            suggestedValueForSale: new FormControl(null, [this.valueValidator]),
            suggestedValueForSeasonal: new FormControl(null, [this.valueValidator]),
            state: new FormControl(null, [Validators.required]),
            city: new FormControl(null, [Validators.required]),
            annotation: new FormControl(null, [Validators.required]),
        });
    }

    valueValidator(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const contractType = this.selectedContractType.value;
            const suggestedValue = control.value;
            if (contractType === 'Locação' && !suggestedValue) {
                return { suggestedValueForRentRequired: true };
            } else if (contractType === 'Venda' && !suggestedValue) {
                return { suggestedValueForSaleRequired: true };
            } else if (contractType === 'Temporada' && !suggestedValue) {
                return { suggestedValueForSeasonalRequired: true };
            }
            return null;
        };
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

    submit() {
        console.log(this.propertyForm.value);
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }
}
