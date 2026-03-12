import { TestBed } from '@angular/core/testing';

import { TourManagerService } from './tour-manager.service';

describe('TourManagerService', () => {
  let service: TourManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TourManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
