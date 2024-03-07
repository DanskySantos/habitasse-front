import {Component, OnInit} from '@angular/core';
import {LayoutService} from 'src/app/layout/service/app.layout.service';
import {AuthService} from '../auth/services/auth.service';


@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    value!: string;
    loading: boolean = false;

    constructor(public layoutService: LayoutService,
                private authService: AuthService) {
    }

    load() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    ngOnInit() {
    }
}
