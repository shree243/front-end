import { Component, OnInit } from '@angular/core';
import {
  PortfolioService,
  PortfolioStock,
  BuyStockRequest,
  SellStockRequest,
} from '../../portfolio.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-portfolio-insights',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './portfolio-insights.component.html',
  styleUrl: './portfolio-insights.component.css',
})
export class PortfolioInsightsComponent implements OnInit {
  stocks: PortfolioStock[] = [];
  token: string = '';

  constructor(
    private portfolioSer: PortfolioService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('authToken') || '';
    this.fetchHoldings();
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/app-auth']);
  }

  fetchHoldings(): void {
    this.portfolioSer.getHoldings(this.token).subscribe({
      next: (data: any) => {
        console.log('📦 Holdings API response:', data);
        this.stocks = data;
      },
      error: (err: any) => {
        console.error('Failed to load holdings:', err);
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
