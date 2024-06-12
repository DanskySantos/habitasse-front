import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UploadService} from "../services/upload.service";
import {UploadResponse} from "aws-s3-upload-ash/src/types";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
})
export class FileUploadComponent implements OnInit {

    uploadedFiles: any[] = [];
    filesOnMemory: any[] = [];
    filesToSendToApi: any;

    @Input('files')
    files?: any;

    @Output('uploadedFilesToSave')
    uploadedFilesToSave = new EventEmitter<any>();

    @Output('removeImagesOnForm')
    removeImagesOnForm = new EventEmitter<any>();

    constructor(private uploadService: UploadService,
                private toastrService: ToastrService) {
    }

    ngOnInit() {
        this.uploadedFiles = [];
        this.uploadedFiles = this.files;
    }

    onSelect(event: any) {
        this.toastrService.success('Clique em Salvar fotos e depois salve a proposta', 'Foto adicionada')
        this.filesOnMemory.push(event.target.files[0]);
    }

    async removeFile(file: any) {
        let newStr: string = file.key.replace("offers-img/", "");
        await this.uploadService.S3CustomClient
            .deleteFile(newStr)
            .then((data: UploadResponse) => {
                this.uploadedFiles = this.uploadedFiles.filter((uploadedFile: any) => uploadedFile.key !== file.key);
                console.log(this.uploadedFiles)
            })
            .catch((err: any) => console.error(err))
        this.removeImagesOnForm.emit(file);
    }

    async onUpload() {
        for (const file of this.filesOnMemory) {
            await this.uploadService.S3CustomClient
                .uploadFile(file, file.type, undefined, file.name, "public-read")
                .then((data: UploadResponse) => {
                    this.filesOnMemory = []
                    this.uploadedFiles.push(data)
                    this.uploadedFilesToSave.emit(data);
                })
                .catch((err: any) => console.error(err))
        }
    }
}
