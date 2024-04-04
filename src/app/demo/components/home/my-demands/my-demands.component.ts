import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {DemandService} from "../services/demand.service";
import {Router} from '@angular/router';
import {PageModel} from "../../shared/models/page.model";
import {PaginatorState} from "primeng/paginator";
import {UpdateDemandModalComponent} from './update-demand-modal/update-demand-modal.component';
import {DemandModel} from '../../shared/models/demand.model';
import {DeleteDemandModalComponent} from './delete-demand-modal/delete-demand-modal.component';
import {ListOfferComponent} from './list-offer-modal/my-offer-modal.component';

@Component({
    templateUrl: './my-demands.component.html',
    selector: 'app-my-demands',

})
export class MyDemandsComponent implements OnInit {

    @Input('demandData')
    demandData?: DemandModel;

    loading: boolean = false;
    visible: boolean = false;
    demands: any;
    totalElements!: number;
    page: number = 0;
    size: number = 4;
    first: number = 0;

    constructor(public layoutService: LayoutService,
                private router: Router,
                protected demandService: DemandService) {
        this.getDemands(this.page, this.size);
    }

    ngOnInit(): void {
    }

    allOffersModal(listoffer: ListOfferComponent) {
        listoffer.visible = true;
        listoffer.getOffers(0, 10);
    }

    modalExcluir(modaldelete: DeleteDemandModalComponent) {
        modaldelete.visible = true;
    }

    editModal(modal: UpdateDemandModalComponent) {
        modal.visibleEdit = true;
    }

    onPageChange(event: PaginatorState) {
        this.first = event.first!
        this.page = event.page!
        this.size = event.rows!
        this.getDemands(event.page!, event.rows!)
    }

    private getDemands(first: number, rows: number) {
        this.demandService.getDemands(first, rows).subscribe((data: PageModel) => {
                this.demands = data.content
                this.totalElements = data.totalElements
            }
        );
    }

    navigateToCreateDemand() {
        this.router.navigate(['/home/property-demand'])
    }
}
