import {Component, Input, OnInit} from '@angular/core';
import {PaginatorState} from "primeng/paginator";
import {PageModel} from "../../../shared/models/page.model";
import {OffersService} from "../../services/offers.service";
import {DemandModel} from "../../../shared/models/demand.model";
import {ToastrService} from "ngx-toastr";

@Component({
    templateUrl: './my-offer-modal.component.html',
    selector: 'app-offer-modal',

})
export class ListOfferComponent implements OnInit {

    @Input('demand')
    demand?: DemandModel;

    @Input('offers')
    offers?: any;
    
    offerAccepted: boolean = false;
    loading: boolean = false;
    visible: boolean = false;
    totalElements!: number;
    page: number = 0;
    size: number = 10;
    first: number = 0;
  
 

    constructor(public offersService: OffersService,  private toastrService: ToastrService) {
    }

    ngOnInit(): void {
    }

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first!
        this.page = event.page!
        this.size = event.rows!
        this.getOffers(event.page!, event.rows!)
    }

    acceptOffer(offerId: number) {
        this.offersService.acceptOffer(offerId).subscribe(
            next => {
                this.offerAccepted = true;  
                this.toastrService.success('Proposta aceita', 'Sucesso');
                location.reload();  
            },
            err => {
                this.toastrService.error(err.code, 'Erro');
                console.log('error:', err);
            }
        );
    }
    
 
    getOffers(first: number, rows: number) {
        this.offersService.getOffers(first, rows, this.demand?.id!).subscribe((data: PageModel) => {
                this.offers = data.content
                this.totalElements = data.totalElements
            }
        );
    }
}
