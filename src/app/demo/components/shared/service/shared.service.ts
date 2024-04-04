import {Injectable} from '@angular/core';
import {throwError} from "rxjs";
import {HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../../environments/environments";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    apiURL: string = environment.apiUrl;
    clientID: string = environment.clientId;
    clientSecret: string = environment.clientSecret;

    constructor() {
    }

    actionForSuccess(response: any) {
        return response;
    }

    actionForError(error: any) {
        return throwError(error);
    }

    finalAction() {
        return;
    }

    setHeaders() {
        return new HttpHeaders({
            'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
            'Content-Type': 'application/json'
        });
    }

    getBoolean(boolean: any): any {
        if (boolean == true)
            return "Sim"
        if (boolean == false)
            return "Não"
    }

    getformatData(dataString: string) {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();

        return `${dia}/${mes}/${ano}`;
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
