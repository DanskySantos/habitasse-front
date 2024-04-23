import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {DemandService} from "../services/demand.service";
import {PageModel} from "../../shared/models/page.model";
import {PaginatorState} from "primeng/paginator";
import {ContractTypeEnum} from "../../enums/contract-type-enum";
import {BedroomsNumberEnum} from "../../enums/bedrooms-number-enum";
import {PropertyTypeEnum} from "../../enums/property-type-enum";
import {PetFriendlyEnum} from "../../enums/pet-friendly-enum";
import {FurnishedEnum} from "../../enums/furnished-enum";
import {SuggestedValueRentEnum} from "../../enums/suggested-value-rent-enum";
import {SuggestedValueSaleEnum} from "../../enums/suggested-value-sale-enum";
import {SuggestedValueSeasonalEnum} from "../../enums/suggested-value-seasonal-enum";
import {AddressService} from "../../shared/service/address.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DemandModel} from "../../shared/models/demand.model";
import {CookieService as NgxCookieService} from 'ngx-cookie-service';
import {CreateUpdateOfferModalComponent} from './create-update-offer.modal/create-update-offer-modal.component';
import {OffersService} from '../services/offers.service';
import {OffersModel} from "../../shared/models/offers.model";
import {color} from "chart.js/helpers";

@Component({
    templateUrl: './all-demands.component.html',
    selector: 'app-all-demands',

})
export class AllDemandsComponent implements OnInit {

    visible: boolean = false;
    demands: any;
    filterForm!: FormGroup;
    totalElements!: number;
    page: number = 0;
    size: number = 4;
    first: number = 0;
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
                private demandService: DemandService,
                private cookieService: NgxCookieService,
                protected offersService: OffersService) {
        this.createForm();
        this.startLists();
        this.getFilteredDemands(this.page, this.size);
    }

    ngOnInit(): void {
    }

    private createForm() {
        this.filterForm = new FormGroup({
            id: new FormControl(null),
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
        this.filterForm.get('id')?.valueChanges.subscribe((value) => {
            this.filterForm.get('id')?.setValue(value, { emitEvent: false });
            this.filter();
        });
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first!
        this.page = event.page!
        this.size = event.rows!
        this.getFilteredDemands(event.page!, event.rows!)
    }

    private getFilteredDemands(first: number, rows: number) {
        this.demandService.getFilteredDemands(first, rows, this.filterForm.value).subscribe((data: PageModel) => {
                this.demands = data.content
                this.totalElements = data.totalElements
            }
        );
    }

    allDemandsModal(proposalmodal: CreateUpdateOfferModalComponent) {
        proposalmodal.visible = true;
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

    findOffer(demand: DemandModel) {
        if (demand.offers)
            return demand.offers?.filter(offer => offer.userId?.toString() === this.cookieService.get('userId')).pop()

        return null;
    }

    getButtonLabel(offer: OffersModel) {
        if (offer == null)
            return 'Fazer proposta'
        if (offer.deleted === false)
            return 'Editar proposta'
        if (offer.deleted === true)
            return 'Proposta Recusada'

        return null;
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

    get selectedContractType() {
        return this.filterForm.get('contractType')!;
    }
}
