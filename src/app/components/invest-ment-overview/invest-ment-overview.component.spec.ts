import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestMentOverviewComponent } from './invest-ment-overview.component';

describe('InvestMentOverviewComponent', () => {
  let component: InvestMentOverviewComponent;
  let fixture: ComponentFixture<InvestMentOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestMentOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestMentOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
