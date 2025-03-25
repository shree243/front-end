import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AuthResponse {
  token: string;
  // Add other properties that might be returned by the API
}

export interface PortfolioStock {
  stock: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
  currentValue: number;
}

export interface BuyStockRequest {
  stockSymbol: string;
  quantity: number;
  price: number;
}

export interface SellStockRequest {
  stockSymbol: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private AuthBaseUrl = 'http://localhost:8082/api/auth'; // Example API
  private portfolioBaseUrl = 'http://localhost:8082/api/portfolio'; // Example API

  constructor(private http: HttpClient) {}

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.AuthBaseUrl}/register`,
      userData
    );
  }

  login(userData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.AuthBaseUrl}/login`, userData);
  }

  // Get list of posts
  getHoldings(token: string): Observable<PortfolioStock[]> {
    return this.http.get<PortfolioStock[]>(
      `${this.portfolioBaseUrl}/holdings`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  buyStock(token: string, request: BuyStockRequest): Observable<void> {
    return this.http.post<void>(`${this.portfolioBaseUrl}/buy`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  sellStock(token: string, request: SellStockRequest): Observable<void> {
    return this.http.post<void>(`${this.portfolioBaseUrl}/sell`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
