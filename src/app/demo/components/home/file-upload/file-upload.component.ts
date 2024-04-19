import { Component } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {

  uploadedFiles: any[] = [];

  onFileUploaded(event: any) {
    this.uploadedFiles = event.detail.value;
  }
}