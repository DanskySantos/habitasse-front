import {OffersModel} from "./offers.model";
import {PropertyDemandModel} from "./property-demand.model";
import {UserModel} from "./user.model";

export class DemandModel {
    id!: number;
    propertyDemand!: PropertyDemandModel;
    annotation?: string;
    contact?: string;
    offers?: OffersModel[];
    user?: UserModel;
}
