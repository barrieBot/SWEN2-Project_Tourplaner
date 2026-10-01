import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TourNewComponent } from './tour-new.component';

describe('TourNewComponent', () => {
  let component: TourNewComponent;
  let fixture: ComponentFixture<TourNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TourNewComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TourNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
