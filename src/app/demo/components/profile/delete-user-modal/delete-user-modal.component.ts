import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {UserService} from "../service/user-service";

@Component({
    templateUrl: 'delete-user-modal.component.html',
    selector: 'app-delete-user-modal',

})
export class DeleteUserModalComponent implements OnInit {

    loading: boolean = false;
    visible: boolean = false;

    constructor(public layoutService: LayoutService,
                private userService: UserService) {
    }

    ngOnInit(): void {
    }

    deleteAccount() {
        this.userService.deleteAccount();
    }
}
