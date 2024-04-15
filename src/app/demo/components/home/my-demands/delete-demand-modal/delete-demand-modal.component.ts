import {Component, Input, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {ToastrService} from "ngx-toastr";
import {Router} from '@angular/router';
import { DemandService } from '../../services/demand.service';
import { FormGroup } from '@angular/forms';
import { DemandModel } from '../../../shared/models/demand.model';

@Component({
    templateUrl: 'delete-demand-modal.component.html',
    selector: 'app-delete-demand-modal',

})
export class DeleteDemandModalComponent implements OnInit {

    @Input() demand: any;

    propertyForm!: FormGroup;
    loading: boolean = false;
    visible: boolean = false;

    constructor(public layoutService: LayoutService,
                private toastrService: ToastrService,
                private router: Router,
                private demandService: DemandService) {
    }

    ngOnInit(): void {
    }

    ModalExcluir() {
        this.visible = true;
    }

    deleteDemand(propertyId: number, demandId: number) {
        this.demandService.deleteDemand(propertyId, demandId).subscribe(  
            next => {
                this.toastrService.success('Demanda excluída com sucesso!');
                location.reload()
            },
            err => {
                this.toastrService.error(err.code, 'Erro ao tentar excluir a demanda')
            }
        )
        
    }

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    navigateToCreateDemand() {
        this.router.navigate(['/home/property-demand'])
    }
}
