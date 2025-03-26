import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonModule } from 'primeng/button';

import { ChartModule } from 'primeng/chart';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, ButtonModule, ChartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  ngOnInit() {
    this.initChart();
  }

  title = 'front-end';

  data: any;

  options: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef, public router: Router) {}

  hideNavbarRoutes: string[] = [
    '/app-invest',
    '/app-dashboard',
    '/app-portfolio',
    '/app-recomm',
  ];

  shouldShowNavbar(): boolean {
    return this.hideNavbarRoutes.includes(this.router.url);
  }
  themeEffect = effect(() => {
    this.initChart();
  });

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-500'),
            documentStyle.getPropertyValue('--p-orange-500'),
            documentStyle.getPropertyValue('--p-gray-500'),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue('--p-cyan-400'),
            documentStyle.getPropertyValue('--p-orange-400'),
            documentStyle.getPropertyValue('--p-gray-400'),
          ],
        },
      ],
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor,
          },
        },
      },
    };
    this.cd.markForCheck();
  }
}
