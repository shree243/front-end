import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../portfolio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-nav',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: './dashboard-nav.component.css',
})
export class DashboardNavComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('authToken'); // 🔐 Clear JWT token
    this.router.navigate(['/app-auth']); // 🔁 Redirect to login page
  }
}
