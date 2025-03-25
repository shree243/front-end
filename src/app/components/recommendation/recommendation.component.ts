import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  ],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.css',
})
export class RecommendationComponent {
  stockDetails: any = null;
  selectedSymbol: string = '';
  apiUrl = 'http://localhost:8082/api/stocks';

  constructor(private http: HttpClient, private router: Router) {}
  token: string = '';
  ngOnInit(): void {
    this.token = localStorage.getItem('token') || ''; // Or use your token strategy
    this.fetchDetails();
  }
  logout() {
    localStorage.removeItem('authToken'); // 🔐 Clear JWT token
    this.router.navigate(['/app-auth']); // 🔁 Redirect to login page
  }

  fetchDetails() {
    if (!this.selectedSymbol) return;

    this.http
      .get<any>(`${this.apiUrl}/details/${this.selectedSymbol}`)
      .subscribe({
        next: (res) => {
          console.log('Stock Details:', res);
          this.stockDetails = res;
        },
        error: (err) => {
          console.error('Error fetching stock details:', err);
        },
      });
  }
}
