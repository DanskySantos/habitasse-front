import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {OffersService} from '../../services/offers.service';
import {DemandModel} from "../../../shared/models/demand.model";

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

    constructor(private offersService: OffersService) {
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
}
