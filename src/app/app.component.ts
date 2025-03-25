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
import { AuthComponent } from './components/auth/auth.component';

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

  // configService = inject(AppConfigService);

  // designerService = inject(DesignerService);

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

  /* The `themeEffect` in the AppComponent is a reactive effect that is triggered when certain
  conditions are met. In this case, the effect is checking if the transition is complete in the
  configuration service and if a preset is available in the designer service. If both conditions are
  true, the `initChart()` method is called to initialize the chart with updated data and options.
  This helps in dynamically updating the chart based on changes in the configuration and designer
  services. */
  themeEffect = effect(() => {
    // if (this.configService.transitionComplete()) {
    //   if (this.designerService.preset()) {
    //     this.initChart();
    //   }
    // }
    this.initChart();
  });

  initChart() {
    // if (isPlatformBrowser(this.platformId)) {
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
// }
