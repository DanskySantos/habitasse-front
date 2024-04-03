import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OffersService} from '../../services/offers.service';
import { DemandModel } from '../../../shared/models/demand.model';
import { DemandService } from '../../services/demand.service';
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import { ContractTypeEnum } from '../../../enums/contract-type-enum';
import { BedroomsNumberEnum } from '../../../enums/bedrooms-number-enum';
import { PropertyTypeEnum } from '../../../enums/property-type-enum';
import { PetFriendlyEnum } from '../../../enums/pet-friendly-enum';
import { FurnishedEnum } from '../../../enums/furnished-enum';
import { SuggestedValueRentEnum } from '../../../enums/suggested-value-rent-enum';
import { SuggestedValueSaleEnum } from '../../../enums/suggested-value-sale-enum';
import { SuggestedValueSeasonalEnum } from '../../../enums/suggested-value-seasonal-enum';
import { AddressService } from '../../../shared/service/address.service';
import { PaginatorState } from 'primeng/paginator';
import { PageModel } from '../../../shared/models/page.model';


@Component({
    templateUrl: './create-update-offer-modal.component.html',
    selector: 'app-create-update-offer-modal',

})
export class CreateUpdateOfferModalComponent implements OnInit {
    @Input('demandId')
    demandId?: number;

    @Input('offer')
    offer?: any;

    totalElements!: number;
    page: number = 0;
    size: number = 10;
    first: number = 0;
    allDemandsOffers!: FormGroup;
    visible: boolean = false;
    loading: boolean = false;
    submited: boolean = false;
    demands: any;

    filterForm!: FormGroup;
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

    constructor(private offersService: OffersService,  private demandService: DemandService,
        private cookieService: NgxCookieService,  private addressService: AddressService) {
            this.createForm();
            this.createForms();
            this.startLists();
            this.getFilteredDemands(this.page, this.size);
    }

    ngOnInit(): void {
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

    private createForms() {
        this.filterForm = new FormGroup({
            contractType: new FormControl(null),
            propertyType: new FormControl(null),
            bedroomsNumber: new FormControl(null),
            furnished: new FormControl(null),
            petFriendly: new FormControl(null),
            suggestedValueForRent: new FormControl(null),
            suggestedValueForSale: new FormControl(null),
            suggestedValueForSeasonal: new FormControl(null),
            state: new FormControl(null),
            city: new FormControl(null),
        });
    }


    onPageChange(event: PaginatorState) {
        this.first = event.first!
        this.page = event.page!
        this.size = event.rows!
        this.getFilteredDemands(event.page!, event.rows!)
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

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    filter() {
        this.getFilteredDemands(this.page, this.size);
    }


    filterCities(event: any) {
        this.addressService.getFilteredCities(event.value).subscribe(cities =>
            this.cities = cities.map(city => city.nome)
        );
        this.getFilteredDemands(this.page, this.size);
    }

    private getFilteredDemands(first: number, rows: number) {
        this.demandService.getFilteredDemands(first, rows, this.filterForm.value).subscribe((data: PageModel) => {
                this.demands = data.content
                this.totalElements = data.totalElements
            }
        );
    }

    get selectedContractType() {
        return this.filterForm.get('contractType')!;
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

    findOffer(demand: DemandModel) {
        if (demand.offers)
        return demand.offers?.filter(offer => offer.userId?.toString() === this.cookieService.get('userId')).pop()
    
        return null;
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
            return "1"
        if (bedroomsNumber == 'TWO')
            return "2"
        if (bedroomsNumber == 'THREE')
            return "3"
        if (bedroomsNumber == 'FOUR')
            return "4"
        if (bedroomsNumber == 'FIVE_OR_MORE')
            return "5 ou mais"
    }

    getBolean(boolean: any): any {
        if (boolean == true)
            return "Sim"
        if (boolean == false)
            return "Não"
    }

    formatarData(dataString: string) {
        const data = new Date(dataString);

        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
    }
}
