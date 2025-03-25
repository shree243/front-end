import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PortfolioInsightsComponent } from './components/portfolio-insights/portfolio-insights.component';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import { InvestMentOverviewComponent } from './components/invest-ment-overview/invest-ment-overview.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: 'app-invest-ment-overview',
    component: InvestMentOverviewComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponentComponent },
  { path: 'app-auth', component: AuthComponent },
  { path: 'app-dashboard', component: DashboardComponent },
  {
    path: 'app-portfolio-insights',
    component: PortfolioInsightsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'app-recommendation', component: RecommendationComponent },
];
