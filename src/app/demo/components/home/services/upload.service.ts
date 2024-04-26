import {Injectable} from '@angular/core';
import {SharedService} from "../../shared/service/shared.service";
import {environment} from "../../../../../environments/environments";
import AWSS3UploadAshClient from "aws-s3-upload-ash";

@Injectable({
    providedIn: 'root'
})
export class UploadService extends SharedService {

    config = {
        bucketName: 'habitasse',
        dirName: 'offers-img',
        region: 'us-east-2',
        accessKeyId: 'environment.awsAccessKey',
        secretAccessKey: 'environment.awsSecretKey',
        s3Url: 'https://habitasse.s3.amazonaws.com/'
    }
    S3CustomClient: AWSS3UploadAshClient = new AWSS3UploadAshClient(this.config);

    constructor() {
        super();
    }
}
