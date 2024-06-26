import {Component, Input, OnInit} from '@angular/core';
import {PaginatorState} from "primeng/paginator";
import {PageModel} from "../../../shared/models/page.model";
import {OffersService} from "../../services/offers.service";

import {ToastrService} from "ngx-toastr";
import {DemandModel} from '../../../shared/models/demand.model';


@Component({
    templateUrl: './my-offer-modal.component.html',
    selector: 'app-offer-modal',

})
export class ListOfferComponent implements OnInit {

    @Input('demand')
    demand?: DemandModel;

    @Input('offers')
    offers?: any;

    loading: boolean = false;
    visible: boolean = false;
    deletevisible: boolean = false;
    totalElements!: number;
    page: number = 0;
    size: number = 10;
    first: number = 0;
    galleriaResponsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(public offersService: OffersService,
                private toastrService: ToastrService) {
    }

    ngOnInit(): void {
    }

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    showdeletelog() {
        this.deletevisible = true;
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first!
        this.page = event.page!
        this.size = event.rows!
        this.getOffers(event.page!, event.rows!)
    }

    acceptOffer(offerId: number) {
        this.offersService.acceptOffer(offerId).subscribe(
        );
    }

    deleteOffer(offerId: number): void {
        this.offersService.deleteOffers(offerId).subscribe(
            next => {
                this.toastrService.success('Oferta excluída com sucesso!');
                location.reload()
            },
            err => {
                this.toastrService.error(err.code, 'Erro ao tentar excluir a oferta')
            }
        )
    }

    getOffers(first: number, rows: number) {
        this.offersService.getOffers(first, rows, this.demand?.id!).subscribe((data: PageModel) => {
                this.offers = data.content
                this.totalElements = data.totalElements
            }
        );
    }

    getUsername(username: string) {
        const nameArray = username.split(' ');
        return nameArray[0]
    }
}
