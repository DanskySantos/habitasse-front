import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from '../auth/services/auth.service';

interface Tipo {
    name: string;
    code: string;
}
 
@Component({
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit, OnDestroy {

    overviewChartData: any;

    overviewChartOptions: any;

    overviewWeeks: any;

    selectedOverviewWeek: any;

    revenueChartData: any;

    revenueChartOptions: any;

    subscription: Subscription;

    value!: string;

    constructor(public layoutService: LayoutService, private authService: AuthService) {
        this.subscription = this.layoutService.configUpdate$
            .pipe(debounceTime(25))
            .subscribe((config) => {
                this.initCharts();
            });
    }

    registerForm!: FormGroup;
    loading: boolean = false;

    tipoContrato: Tipo[] | undefined;
    tipoImovel: Tipo[] | undefined;
    QuanQuartos: Tipo[] | undefined;
    tipoMobiliado: Tipo[] | undefined;
    permitidoPet: Tipo[] | undefined;


    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false;
        }, 2000);
    }

    ngOnInit() {
        this.tipoContrato = [
            { name: 'Locação', code: 'LO' },
            { name: 'Venda', code: 'VE' },
            { name: 'Temporada', code: 'TE' },
        ];

        this.tipoImovel = [
            { name: 'Apartamento', code: 'AP' },
            { name: 'Casa', code: 'CA' },
            { name: 'Kitnet', code: 'KI' },
            { name: 'Cobertura', code: 'CO' },
        ];

        this.tipoMobiliado = [
            { name: 'Sim', code: 'S' },
            { name: 'Não', code: 'N' },
            { name: 'Nenhum', code: 'NE' },
        ];

        this.QuanQuartos = [
            { name: '1', code: '1' },
            { name: '2', code: '2' },
            { name: '3', code: '3' },
            { name: '4', code: '4' },
            { name: '5', code: '5' },
        ];

        this.permitidoPet = [
            { name: 'Sim', code: 'S' },
            { name: 'Não', code: 'N' },
            { name: 'Nenhum', code: 'NE' },
        ];
 
  
        this.createForm();
        this.initCharts();
        this.overviewWeeks = [
            {name: 'Last Week', code: '0'},
            {name: 'This Week', code: '1'}
        ];
        this.selectedOverviewWeek = this.overviewWeeks[0];
    }


    private createForm() {
        this.registerForm = new FormGroup({
            selectedTipoContrato: new FormControl<Tipo | null>(null),
            selectedTipoImovel: new FormControl<Tipo | null>(null),
            localidade: new FormControl('', [Validators.required]),
            selectQuantidade: new FormControl<Tipo | null>(null),
            selectedMobiliado: new FormControl<Tipo | null>(null),
            selectedPermitidoPet: new FormControl<Tipo | null>(null),
            valorsugerido: new FormControl('', [Validators.required]),
            sugestao: new FormControl('', [Validators.required]),
        });
    }

    get contrato() {
        return this.registerForm.get('contrato')!;
    }

    get imovel() {
        return this.registerForm.get('imovel')!;
    }   

    get localidade() {
        return this.registerForm.get('localidade')!;
    }

    get quantidade() {
        return this.registerForm.get('quantidade')!;
    }

    get mobiliado() {
        return this.registerForm.get('mobiliado')!;
    }

    get permitidopets() {
        return this.registerForm.get('permitidopets')!;
    }
 
    get valorsugerido() {
        return this.registerForm.get('valorsugerido')!;     
    }

    get sugestao() {
        return this.registerForm.get('sugestao')!;
    }
   


    submit() {
        this.authService.register(this.registerForm.value).subscribe();
        console.log(this.registerForm.value);
    }



 
    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const primaryColor = documentStyle.getPropertyValue('--primary-color');
        const primaryColor300 = documentStyle.getPropertyValue('--primary-200');
        const borderColor = documentStyle.getPropertyValue('--surface-border');

        this.overviewChartData = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            datasets: [
                {
                    label: 'Organic',
                    data: [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
                    borderColor: [
                        primaryColor
                    ],
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    type: 'line',
                    fill: false,
                },
                {
                    label: 'Referral',
                    data: [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1],
                    backgroundColor: [this.layoutService.config().colorScheme === 'dark' ? '#879AAF' : '#E4E7EB'] ,
                    hoverBackgroundColor: [primaryColor300],
                    fill: true,
                    borderRadius: 10,
                    borderSkipped: 'top bottom',
                    barPercentage: 0.3
                }
            ]
        };

        this.overviewChartOptions = {
            plugins: {
                legend: {
                    position: 'bottom',
                    align: 'end',
                    labels: {
                        color: textColorSecondary
                    }
                }
            },
            responsive: true,
            hover: {
                mode: 'index'
            },
            scales: {
                y: {
                    max: 7,
                    min: 0,
                    ticks: {
                        stepSize: 0,
                        callback: function(value: number, index: number) {
                            if (index === 0) {
                                return value;
                            }
                            else {
                                return value + 'k';
                            }
                        },
                        color: textColorSecondary
                    },
                    grid: {
                        borderDash: [2, 2],
                        color: borderColor,
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        color: textColorSecondary
                    }
                }
            }
        };

        this.revenueChartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    data: [11, 17, 30, 60, 88, 92],
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: false,
                    tension: .4
                },
                {
                    data: [11, 19, 39, 59, 69, 71],
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: false,
                    tension: .4
                },
                {
                    data: [11, 17, 21, 30, 47, 83],
                    backgroundColor: 'rgba(25, 146, 212, 0.2)',
                    borderColor: 'rgba(25, 146, 212, 0.5)',
                    pointBorderColor: 'transparent',
                    pointBackgroundColor: 'transparent',
                    fill: true,
                    tension: .4
                }
            ]
        };

        this.revenueChartOptions = {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    grid: {
                        color: borderColor
                    },
                    max: 100,
                    min: 0,
                    ticks: {
                        color: textColorSecondary
                    }
                },
                x: {
                    grid: {
                        color: borderColor
                    },
                    ticks: {
                        color: textColorSecondary,
                        beginAtZero: true
                    }
                }
            }
        };
    }

    changeOverviewWeek() {
        const dataSet1 = [
            [2, 1, 0.5, 0.6, 0.5, 1.3, 1],
            [4.88, 3, 6.2, 4.5, 2.1, 5.1, 4.1]
        ];
        const dataSet2 = [
            [3, 2.4, 1.5, 0.6, 4.5, 3.3, 2],
            [3.2, 4.1, 2.2, 5.5, 4.1, 3.6, 3.5],
        ];

        if (this.selectedOverviewWeek.code === '1') {
            this.overviewChartData.datasets[0].data = dataSet2[parseInt('0')];
            this.overviewChartData.datasets[1].data = dataSet2[parseInt('1')];
        }
        else {
            this.overviewChartData.datasets[0].data = dataSet1[parseInt('0')];
            this.overviewChartData.datasets[1].data = dataSet1[parseInt('1')];
        }

        this.overviewChartData = { ...this.overviewChartData };
    }

    get colorScheme(): string {
        return this.layoutService.config().colorScheme;
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
