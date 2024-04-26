import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {OffersService} from '../../services/offers.service';
import {DemandModel} from "../../../shared/models/demand.model";
import {OffersModel} from "../../../shared/models/offers.model";
import { FileUploadComponent } from '../../file-upload/file-upload.component';

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

    constructor(protected offersService: OffersService) {
    }

    ngOnInit() {
        this.createForm();
    }

    saveOffers() {
        if (this.offer) {
            this.submited = true;
            this.offersService.editOffers(this.allDemandsOffers.value, this.offer.id)
        } else {
            this.submited = true;
            this.offersService.createOffers(this.allDemandsOffers.value)
        }
        console.log(this.allDemandsOffers.value)
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    createForm() {
        if (this.offer) {
            console.log(this.offer.files.length)
            this.allDemandsOffers = new FormGroup({
                demandId: new FormControl(this.demand?.id),
                text: new FormControl(this.offer.text, [Validators.required]),
                files: this.offer.files.length == 0 ? new FormArray([]) : new FormArray(
                    this.offer.files.map((fileItem: any) => {
                        return new FormGroup({
                            bucket: new FormControl(fileItem.bucket, [Validators.required]),
                            key: new FormControl(fileItem.key, [Validators.required]),
                            location: new FormControl(fileItem.location, [Validators.required]),
                            status: new FormControl(fileItem.status, [Validators.required]),
                            body: new FormControl(fileItem.body, [Validators.required])
                        });
                    })
                )
            });
        } else {
            this.allDemandsOffers = new FormGroup({
                demandId: new FormControl(this.demand?.id),
                text: new FormControl(null, [Validators.required]),
                files: new FormArray([])
            });
        }
    }

    putImagesOnForm(event: any) {
        console.log(event)
        let fileGroup = new FormGroup({
            bucket: new FormControl(),
            key: new FormControl(),
            location: new FormControl(),
            status: new FormControl(),
            body: new FormControl()
        });
        event.forEach((fileItem: any) => {
            fileGroup.patchValue(fileItem);
        });
        (this.allDemandsOffers.get('files') as FormArray).push(fileGroup);
    }

    getButtonLabel(offer: OffersModel) {
        if (offer == null)
            return 'Fazer proposta'
        if (offer.deleted === false)
            return 'Editar proposta'
        if (offer.deleted === true)
            return 'Reenviar proposta'

        return null;
    }

    get getFiles() {
        return this.allDemandsOffers.get('files')!.value;
    }
}
