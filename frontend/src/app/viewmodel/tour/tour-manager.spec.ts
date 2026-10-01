import { TestBed } from '@angular/core/testing';
import { TourManager } from './tour-manager';

describe('TourManager', () => {
  let service: TourManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
