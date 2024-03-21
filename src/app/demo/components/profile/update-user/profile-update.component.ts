import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserService} from '../service/user-service';
import {ToastrService} from "ngx-toastr";
import {UserModel} from "../models/user.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    templateUrl: './profile-update.component.html',
    selector: 'app-profile-upload',
})
export class ProfileUpdateComponent implements OnInit {


    @Input('userData')
    userData?: UserModel;

    @Output('actionSuccess')
    actionSuccess = new EventEmitter<UserModel>();

    userForm!: FormGroup;
    maxDate: Date = new Date();
    loading: boolean = false;
    inputDate?: string;

    constructor(private userService: UserService,
                private toastrService: ToastrService) {
    }

    ngOnInit() {
        this.createForm();
    }

    private createForm() {
        this.userForm = new FormGroup({
            id: new FormControl(this.userData?.id, [Validators.required]),
            name: new FormControl(this.userData?.name, [Validators.required]),
            birthday: new FormControl(this.userData?.birthday, [Validators.required]),
            phone: new FormControl(this.userData?.phone, [Validators.required]),
            username: new FormControl(this.userData?.username, [Validators.required]),
            email: new FormControl(this.userData?.email, [Validators.required]),
        });
    }

    updateUserProfile() {
        this.userService.updateUserProfile(this.userForm.value);
        this.actionSuccess.emit(this.userForm.value);
    }

    public inputDateChanged(): void {
        this.selectedBirthday.patchValue(this.inputDate);
    }

    update() {
        this.updateUserProfile();
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    get selectedBirthday() {
        return this.userForm.get('birthday')!;
    }
}
