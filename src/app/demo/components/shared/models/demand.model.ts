import { AddressModel } from "./address.model";
import { OffersModel } from "./offers.model";
import { PropertyDemandModel } from "./property-demand.model";

export class DemandModel {
  id!: number;
  propertyDemand!: PropertyDemandModel;
  annotation?: string;
  contact?: string;
  offers?: OffersModel[];
}
