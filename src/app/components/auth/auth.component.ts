import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { PortfolioService } from '../../portfolio.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule],
})
export class AuthComponent {
  rightPanelActive = false;
  errorMessage = '';

  constructor(
    private portfolioService: PortfolioService,
    private router: Router
  ) {}

  register(form: NgForm): void {
    console.log(form, 'formform');
    if (form.valid) {
      this.portfolioService.register(form.value).subscribe({
        next: (response) => {
          console.log('Registration Success:', response);
          // Optional: Handle registration response if needed, such as auto-login or redirect
        },
        error: (error) => {
          this.errorMessage = 'Registration Failed';
          console.error('Registration Error:', error);
        },
      });
    }
  }

  login(form: NgForm): void {
    console.log(form, 'formform');
    if (form.valid) {
      this.portfolioService.login(form.value).subscribe({
        next: (response) => {
          console.log('Login Success:', response);
          console.log('Login Success:', response.token);
          localStorage.setItem('authToken', response.token); // Assuming the token is in response.token
          this.router.navigate(['/app-invest-ment-overview']); // Navigate to dashboard
        },
        error: (error) => {
          this.errorMessage = 'Login Failed';
          console.error('Login Error:', error);
        },
      });
    }
  }

  toggleRightPanel(): void {
    this.rightPanelActive = !this.rightPanelActive;
  }
}
