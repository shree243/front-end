import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioInsightsComponent } from './portfolio-insights.component';

describe('PortfolioInsightsComponent', () => {
  let component: PortfolioInsightsComponent;
  let fixture: ComponentFixture<PortfolioInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioInsightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
