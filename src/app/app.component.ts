import {Component, OnInit} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {AppConfig, LayoutService} from "./layout/service/app.layout.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig,
                private layoutService: LayoutService) {
    }

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        //optional configuration with the default configuration
        const config: AppConfig = {
            ripple: true,
            inputStyle: 'outlined',
            menuMode: 'slim-plus',
            colorScheme: 'light',
            theme: 'green',
            layoutTheme: 'colorScheme',
            scale: 14,
        };
        this.layoutService.config.set(config);
    }
}

