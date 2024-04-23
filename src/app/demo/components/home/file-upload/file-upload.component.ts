import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileUploadService} from '../services/upload.service';


@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent{

  constructor(private http: HttpClient, private fileUploadService: FileUploadService) {}
 
  uploadFile(event: any) {
    const file: File = event.target.files[0];
    this.fileUploadService.uploadFiles(file).subscribe(
      (response) => {
        console.log('File uploaded successfully');
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
}
