import {AddressModel} from "./address.model";
import {DemandModel} from "./demand.model";

export class PropertyDemandModel {
    id!: number;
    contractType!: string;
    propertyType!: string;
    bedroomsNumber!: string;
    furnished!: boolean;
    petFriendly!: boolean;
    suggestedValueForRent!: string;
    suggestedValueForSale!: string;
    suggestedValueForSeasonal!: string;
    address!: AddressModel;
    annotation!: DemandModel;
}
