import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../service/user-service';
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import { UserModel } from '../../shared/models/user.model';

@Component({
    templateUrl: './password-update.component.html',
    selector: 'app-password-upload',
})
export class PasswordUpdateComponent implements OnInit {


    @Input('userData')
    userData?: UserModel;

    @Output('actionSuccess')
    actionSuccess = new EventEmitter<boolean>();

    userPasswordForm!: FormGroup;
    loading: boolean = false;

    constructor(private userService: UserService,
                private toastrService: ToastrService) {
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.userPasswordForm = new FormGroup({
            id: new FormControl(this.userData?.id, [Validators.required]),
            currentPassword: new FormControl(null, [Validators.required]),
            newPassword: new FormControl(null, [Validators.required]),
        });
    }


    updateUserPassword() {
        console.log(this.userData?.id, this.selectedCurrentPassword.value, this.selectedNewPassword.value)
        this.userService.updateUserPassword(this.userData?.id!, this.selectedCurrentPassword.value, this.selectedNewPassword.value);
        this.actionSuccess.emit(false);
    }

    updatePassword() {
        this.updateUserPassword();
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }


    get selectedCurrentPassword() {
        return this.userPasswordForm.get('currentPassword')!;
    }

    get selectedNewPassword(){
        return this.userPasswordForm.get('newPassword')!;
    }
}
