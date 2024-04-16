import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { UploadService } from '../services/upload.service';
 
@Component({
    templateUrl: './upload-image.component.html',
    selector: 'upload-image',
})
export class UploadComponent implements OnInit {
    uploadedFileUrl!: string;

    onFileUploaded(event: any) {
        this.uploadedFileUrl = event.detail.value;
    }
    ngOnInit() {
    }
}
