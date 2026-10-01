import { TestBed } from '@angular/core/testing';
import { LocationManager } from './location-manager';

describe('LocationManager', () => {
  let service: LocationManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
