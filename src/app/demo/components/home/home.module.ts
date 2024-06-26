import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';
import {PropertyDemandComponent} from './property-demand/property-demand.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MyDemandsComponent} from "./my-demands/my-demands.component";
import {AvatarModule} from "primeng/avatar";
import {DialogModule} from 'primeng/dialog';
import {PaginatorModule} from "primeng/paginator";
import {ProfileModule} from "../profile/profile.module";
import {AccordionModule} from "primeng/accordion";
import {UpdateDemandModalComponent} from './my-demands/update-demand-modal/update-demand-modal.component';
import {AllDemandsComponent} from './all-demands/all-demands.component';
import {DeleteDemandModalComponent} from './my-demands/delete-demand-modal/delete-demand-modal.component';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {CreateUpdateOfferModalComponent} from './all-demands/create-update-offer.modal/create-update-offer-modal.component';
import {ListOfferComponent} from './my-demands/list-offer-modal/my-offer-modal.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {GalleriaModule} from "primeng/galleria";
import {InputSwitchModule} from "primeng/inputswitch";
import {PaymentComponent} from "./payment/payment.component";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        DropdownModule,
        InputTextareaModule,
        AvatarModule,
        NgOptimizedImage,
        DialogModule,
        PaginatorModule,
        ProfileModule,
        AccordionModule,
        NgxUiLoaderModule,
        GalleriaModule,
        InputSwitchModule,
    ],
    exports: [
        HomeComponent,
        PropertyDemandComponent,
        MyDemandsComponent,
        UpdateDemandModalComponent,
        DeleteDemandModalComponent,
        AllDemandsComponent,
        CreateUpdateOfferModalComponent,
        ListOfferComponent,
        FileUploadComponent,
        PaymentComponent
    ],
    declarations: [
        HomeComponent,
        PropertyDemandComponent,
        MyDemandsComponent,
        UpdateDemandModalComponent,
        DeleteDemandModalComponent,
        AllDemandsComponent,
        CreateUpdateOfferModalComponent,
        ListOfferComponent,
        FileUploadComponent,
        PaymentComponent
    ]
})
export class HomeModule {
}
