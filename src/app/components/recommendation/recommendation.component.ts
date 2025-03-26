import { Component, TemplateRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PortfolioService } from '../../portfolio.service';
import { MatDialogModule } from '@angular/material/dialog';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-recommendation',
  imports: [
    RouterOutlet,
    RouterLink,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    MatDialogModule,
    NgApexchartsModule,
  ],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css',
})
export class RecommendationComponent {
  stockDetails: any = null;
  selectedSymbol: string = '';
  quantity: number = 0;
  apiUrl = 'http://localhost:8082/api/stocks';

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private portfolioSer: PortfolioService
  ) {}

  @ViewChild('chart') chart!: ChartComponent;
  @ViewChild('buyDialog') buyDialogTemplate!: TemplateRef<any>;
  token: string = '';
  public chartOptions: ChartOptions = {
    series: [
      {
        name: 'Candles',
        data: [],
      },
    ],
    chart: {
      type: 'candlestick',
      height: 350,
    },
    title: {
      text: '',
      align: 'left',
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };
  ngOnInit(): void {
    this.token = localStorage.getItem('authToken') || '';
    this.fetchDetails();
  }
  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/app-auth']);
  }

  fetchDetails() {
    if (!this.selectedSymbol) return;
    const symbol = this.selectedSymbol.toUpperCase();

    this.http.get<any>(`${this.apiUrl}/details/${symbol}`).subscribe({
      next: (res) => {
        console.log('Stock Details:', res);
        this.stockDetails = res;
        this.fetchCandlestickData(symbol);
      },
      error: (err) => {
        console.error('Error fetching stock details:', err);
      },
    });
  }

  openBuyDialog(symbol: string) {
    this.selectedSymbol = symbol;
    this.quantity = 0;
    this.dialog.open(this.buyDialogTemplate);
  }

  confirmBuy() {
    const request = {
      stockSymbol: this.selectedSymbol,
      quantity: this.quantity,
      price: this.stockDetails?.current || 0,
    };
    console.log(this.token);
    this.portfolioSer.buyStock(this.token, request).subscribe(() => {
      this.dialog.closeAll();
      alert('Stock purchased!');
    });
  }

  fetchCandlestickData(symbol: string) {
    this.http
      .get<any[]>(`http://localhost:8082/api/stocks/${symbol}/candles`)
      .subscribe({
        next: (data) => {
          const formatted = data.map((d) => {
            return {
              x: new Date(d.date),
              y: [
                parseFloat(d.open),
                parseFloat(d.high),
                parseFloat(d.low),
                parseFloat(d.close),
              ],
            };
          });
          console.log(formatted, 'formatted');

          this.chartOptions = {
            series: [
              {
                name: 'Candles',
                data: formatted,
              },
            ],
            chart: {
              type: 'candlestick',
              height: 350,
            },
            title: {
              text: `${symbol.toUpperCase()} - Daily Candlestick`,
              align: 'left',
            },
            xaxis: {
              type: 'datetime',
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          };
        },
        error: (err) => {
          console.error('Failed to fetch candlestick data', err);
        },
      });
  }
}
