import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  PortfolioService,
  PortfolioStock,
  BuyStockRequest,
  SellStockRequest,
} from '../../portfolio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-invest-ment-overview',
  imports: [RouterOutlet, RouterLink, MatCardModule, CommonModule],
  templateUrl: './invest-ment-overview.component.html',
  styleUrl: './invest-ment-overview.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvestMentOverviewComponent implements OnInit {
  stocks: PortfolioStock[] = [];
  valuation: any = {};
  token: string = '';

  constructor(
    private portfolioSer: PortfolioService,
    private router: Router,
    private http: HttpClient
  ) {}

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/app-auth']);
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken') || '';
    this.fetchHoldings();
    this.fetchValuation();
  }

  fetchHoldings(): void {
    this.portfolioSer.getHoldings(this.token).subscribe({
      next: (data: any) => {
        console.log('Holdings API response:', data);
        this.stocks = data;
      },
      error: (err: any) => {
        console.error('Failed to load holdings:', err);
      },
    });
  }
  fetchValuation(): void {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http
      .get('http://localhost:8082/api/portfolio/value', { headers })
      .subscribe({
        next: (res) => {
          console.log('📊 Valuation:', res);
          this.valuation = res;
        },
        error: (err) => {
          console.error('Error fetching valuation:', err);
        },
      });
  }

  buy(stock: PortfolioStock): void {
    const request: BuyStockRequest = {
      stockSymbol: stock.stock,
      quantity: 1,
      price: stock.currentPrice,
    };

    this.portfolioSer.buyStock(this.token, request).subscribe({
      next: () => {
        alert('Buy successful!');
        this.fetchHoldings();
      },
      error: (err: any) => alert('Buy failed!'),
    });
  }

  sell(stock: PortfolioStock): void {
    const request: SellStockRequest = {
      stockSymbol: stock.stock,
      quantity: 1,
      price: stock.currentPrice,
    };

    this.portfolioSer.sellStock(this.token, request).subscribe({
      next: () => {
        alert('Sell successful!');
        this.fetchHoldings();
      },
      error: (err: any) => alert('Sell failed!'),
    });
  }
}
