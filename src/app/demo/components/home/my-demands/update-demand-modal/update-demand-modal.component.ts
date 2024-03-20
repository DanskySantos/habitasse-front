import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AddressService } from '../../../shared/service/address.service';
import { PropertyDemandService } from '../../services/property-demand.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContractTypeEnum } from '../../../enums/contract-type-enum';
import { BedroomsNumberEnum } from '../../../enums/bedrooms-number-enum';
import { PropertyTypeEnum } from '../../../enums/property-type-enum';
import { PetFriendlyEnum } from '../../../enums/pet-friendly-enum';
import { FurnishedEnum } from '../../../enums/furnished-enum';
import { SuggestedValueRentEnum } from '../../../enums/suggested-value-rent-enum';
import { SuggestedValueSaleEnum } from '../../../enums/suggested-value-sale-enum';
import { SuggestedValueSeasonalEnum } from '../../../enums/suggested-value-seasonal-enum';
import { DemandService } from '../../services/demand.service';
import { DemandModel } from '../../../shared/models/demand.model';

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
    actionSuccess: any;
 
    constructor(public layoutService: LayoutService,
                private addressService: AddressService,
                private propertyDemandService: PropertyDemandService,
                private demandService: DemandService) {
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
            contractType: new FormControl(this.getContractType(this.demandData!.propertyDemand!.contractType), [Validators.required]),
            propertyType: new FormControl(this.getPropertyType(this.demandData!.propertyDemand!.propertyType), [Validators.required]),
            bedroomsNumber: new FormControl(this.getBedroomsNumber(this.demandData!.propertyDemand!.bedroomsNumber), [Validators.required]),
            furnished: new FormControl(this.getFurnished(this.demandData!.propertyDemand!.furnished), [Validators.required]),
            petFriendly: new FormControl(this.getBolean(this.demandData!.propertyDemand!.petFriendly), [Validators.required]),
            suggestedValueForRent: new FormControl(this.getValueForRent(this.demandData!.propertyDemand!.suggestedValueForRent ? this.demandData!.propertyDemand!.suggestedValueForRent : '')),
            suggestedValueForSale: new FormControl(this.getValueForSale(this.demandData!.propertyDemand!.suggestedValueForSale ? this.demandData!.propertyDemand!.suggestedValueForSale : '')),
            suggestedValueForSeasonal: new FormControl(this.getValueForSeasonal(this.demandData!.propertyDemand!.suggestedValueForSeasonal ? this.demandData!.propertyDemand!.suggestedValueForSeasonal : '')),
            state: new FormControl(this.demandData!.propertyDemand!.address!.state, [Validators.required]),
            city: new FormControl(this.demandData!.propertyDemand!.address!.city, [Validators.required]),
            annotation: new FormControl(this.demandData!.annotation ? this.demandData!.annotation : '', [Validators.required]),
        });
        this.propertyForm.get('contractType')?.valueChanges.subscribe(contractType => {
            this.setValidatorsBasedOnContractType(contractType);
        });
    }

 
    
    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
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
        this.updateDemand();
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
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

    getContractType(contractType: string): any {
        if (contractType == 'RENT')
            return 'Locação'
        if (contractType == 'SALE')
            return 'Venda'
        if (contractType == 'SEASONAL')
            return 'Temporada'
    }

    getPropertyType(propertyType: string): any {
        if (propertyType == 'HOUSE')
            return 'Casa'
        if (propertyType == 'APARTMENT')
            return 'Apartamento'
        if (propertyType == 'COMMERCIAL')
            return 'Ponto Comercial'
        if (propertyType == 'ALLOTMENT')
            return 'Loteamento'
        if (propertyType == 'FARM')
            return 'Sítio/Fazenda/Chácara'
    }

    getLocation(address: any): any {
        return address.city + ' - ' + address.state
    }

    getValue(propertyDemand: any): any {
        if (propertyDemand.contractType == 'RENT')
            return this.getValueForRent(propertyDemand.suggestedValueForRent);
        if (propertyDemand.contractType == 'SALE')
            return this.getValueForSale(propertyDemand.suggestedValueForSale);
        if (propertyDemand.contractType == 'SEASONAL')
            return this.getValueForSeasonal(propertyDemand.suggestedValueForSeasonal);
    }

    getValueForRent(suggestedValueForRent: any): any {
        if (suggestedValueForRent == 'R$1K')
            return "R$ 1.000,00"
        if (suggestedValueForRent == 'R$2K')
            return "R$ 2.000,00"
        if (suggestedValueForRent == 'R$3K')
            return "R$ 3.000,00"
        if (suggestedValueForRent == 'R$4K')
            return "R$ 4.000,00"
        if (suggestedValueForRent == 'R$5K')
            return "R$ 5.000,00"
        if (suggestedValueForRent == 'R$6K')
            return "R$ 6.000,00"
        if (suggestedValueForRent == 'R$10K')
            return "R$ 10.000,00"
        if (suggestedValueForRent == 'R$15K')
            return "R$ 15.000,00"
    }

    getValueForSale(suggestedValueForSale: any): any {
        if (suggestedValueForSale == 'R$400K')
            return "R$ 400.000,00"
        if (suggestedValueForSale == 'R$800K')
            return "R$ 800.000,00"
        if (suggestedValueForSale == 'R$1200K')
            return "R$ 1.200.000,00"
        if (suggestedValueForSale == 'R$1600K')
            return "R$ 1.600.000,00"
        if (suggestedValueForSale == 'R$2000K')
            return "R$ 2.000.000,00"
        if (suggestedValueForSale == 'R$2400K')
            return "R$ 2.400.000,00"
        if (suggestedValueForSale == 'R$5000K')
            return "R$ 5.000.000,00"
        if (suggestedValueForSale == 'R$10000K')
            return "R$ 10.000.000,00"
        if (suggestedValueForSale == 'R$15000K')
            return "R$ 15.000.000,00"
        if (suggestedValueForSale == 'R$20000K')
            return "R$ 20.000.000,00"
    }

    getValueForSeasonal(suggestedValueForSeasonal: any): any {
        if (suggestedValueForSeasonal == 'R$200')
            return "R$ 200,00"
        if (suggestedValueForSeasonal == 'R$400')
            return "R$ 400,00"
        if (suggestedValueForSeasonal == 'R$800')
            return "R$ 800,00"
        if (suggestedValueForSeasonal == 'R$1500')
            return "R$ 1.500,00"
        if (suggestedValueForSeasonal == 'R$2000')
            return "R$ 2.000,00"
        if (suggestedValueForSeasonal == 'R$2500')
            return "R$ 2.500,00"
        if (suggestedValueForSeasonal == 'R$3000')
            return "R$ 3.000,00"
        if (suggestedValueForSeasonal == 'R$5000')
            return "R$ 5.000,00"
    }

    getBedroomsNumber(bedroomsNumber: any): any {
        if (bedroomsNumber == 'ONE')
            return "Um quarto"
        if (bedroomsNumber == 'TWO')
            return "Dois quartos"
        if (bedroomsNumber == 'THREE')
            return "Três quartos"
        if (bedroomsNumber == 'FOUR')
            return "Quatro quartos"
        if (bedroomsNumber == 'FIVE_OR_MORE')
            return "Cinco ou mais quartos"
    }

    getFurnished(furnished: any): any {
        if (furnished == true)
            return "Sim"
        if (furnished == false)
            return "Não"
    }

    getBolean(boolean: any): any {
        if (boolean == true)
            return "Sim"
        if (boolean == false)
            return "Não"
    }
}
