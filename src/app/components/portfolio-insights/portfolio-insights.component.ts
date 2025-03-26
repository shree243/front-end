import { Component, OnInit } from '@angular/core';
import { TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-portfolio-insights',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './portfolio-insights.component.html',
  styleUrl: './portfolio-insights.component.css',
})
export class PortfolioInsightsComponent implements OnInit {
  stocks: PortfolioStock[] = [];
  token: string = '';
  selectedQuantity: number = 1;
  selectedStock!: PortfolioStock;
  @ViewChild('quantityDialog') quantityDialog!: TemplateRef<any>;

  selectedAction: 'buy' | 'sell' = 'buy';

  constructor(
    private portfolioSer: PortfolioService,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog
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
        console.log('Holdings API response:', data);
        this.stocks = data;
      },
      error: (err: any) => {
        console.error('Failed to load holdings:', err);
      },
    });
  }

  buyStock(stock: PortfolioStock, quantity: number): void {
    const request: BuyStockRequest = {
      stockSymbol: stock.stock,
      quantity: quantity,
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

  sellStock(stock: PortfolioStock, quantity: number): void {
    const request: SellStockRequest = {
      stockSymbol: stock.stock,
      quantity: quantity,
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

  openQuantityDialog(action: 'buy' | 'sell', stock: PortfolioStock): void {
    this.selectedAction = action;
    this.selectedStock = stock;
    this.selectedQuantity = 1;

    this.dialog.open(this.quantityDialog, {
      width: '300px',
    });
  }

  confirmQuantity(): void {
    const request = {
      stockSymbol: this.selectedStock.stock,
      quantity: this.selectedQuantity,
      price: this.selectedStock.currentPrice,
    };

    if (this.selectedAction === 'buy') {
      this.portfolioSer.buyStock(this.token, request).subscribe({
        next: () => {
          alert('Buy successful!');
          this.dialog.closeAll();
          this.fetchHoldings();
        },
        error: () => alert('Buy failed!'),
      });
    } else {
      this.portfolioSer.sellStock(this.token, request).subscribe({
        next: () => {
          alert('Sell successful!');
          this.dialog.closeAll();
          this.fetchHoldings();
        },
        error: () => alert('Sell failed!'),
      });
    }
  }
}
