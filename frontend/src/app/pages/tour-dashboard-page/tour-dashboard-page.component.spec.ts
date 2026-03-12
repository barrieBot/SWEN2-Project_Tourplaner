import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourDashboardPageComponent } from './tour-dashboard-page.component';

describe('TourDashboardPageComponent', () => {
  let component: TourDashboardPageComponent;
  let fixture: ComponentFixture<TourDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourDashboardPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TourDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
