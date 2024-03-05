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
    disableCasteDropdown: boolean | undefined;

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

    
    toggleDropdowns(contractType: string) {
        const dropdowns = ['propertyType', 'bedroomsNumber', 'furnished', 'petFriendly', 'state', 'city'];
    
        if (contractType) {
            dropdowns.forEach(dropdown => {
                this.propertyForm.get(dropdown)!.enable();
            });
        } else {
            dropdowns.forEach(dropdown => {
                this.propertyForm.get(dropdown)!.disable();
            });
        }
    }
    

    save() {
        this.propertyDemandService.save(this.propertyForm.value);
        console.log(this.propertyForm.value)
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
            suggestedValueForRent: new FormControl(null, [Validators.required]),
            suggestedValueForSale: new FormControl(null, [Validators.required]),
            suggestedValueForSeasonal: new FormControl(null, [Validators.required]),
            state: new FormControl(null, [Validators.required]),
            city: new FormControl(null, [Validators.required]),
            annotation: new FormControl(null, [Validators.required]),
        });
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

    get valorsugerido() {
        return this.propertyForm.get('valorsugerido')!;
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
