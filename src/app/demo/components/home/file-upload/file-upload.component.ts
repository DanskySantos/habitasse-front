import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadService} from "../services/upload.service";
import {UploadResponse} from "aws-s3-upload-ash/dist/types";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {

    uploadedFiles: any[] = [];
    fileOnMemory: any;
    filesToSendToApi: any;

    @Input('files')
    files?: any;

    @Output('uploadedFilesToSave')
    uploadedFilesToSave = new EventEmitter<any>();

    constructor(private uploadService: UploadService) {
    }

    ngOnInit() {
        this.uploadedFiles = [];
        this.uploadedFiles = this.files;
    }

    onSelect(event: any) {
        this.fileOnMemory = event.target.files[0];
        this.onUpload();
    }

    async removeFile(file: any) {
        let newStr: string = file.key.replace("offers-img/", "");
        await this.uploadService.S3CustomClient
            .deleteFile(newStr)
            .then((data: UploadResponse) => {
                this.uploadedFiles = this.uploadedFiles.filter((uploadedFile: any) => uploadedFile.key !== file.key);
            })
            .catch((err: any) => console.error(err))
        this.uploadedFilesToSave.emit(this.uploadedFiles);
    }

    async onUpload() {
        await this.uploadService.S3CustomClient
            .uploadFile(this.fileOnMemory, this.fileOnMemory.type, undefined, this.fileOnMemory.name, "public-read")
            .then((data: UploadResponse) => {
                this.uploadedFiles.push(data)
                this.filesToSendToApi = data
            })
            .catch((err: any) => console.error(err))

        this.uploadedFilesToSave.emit(this.filesToSendToApi);
    }
}
