import { TestBed } from '@angular/core/testing';
import { LogManager } from './log-manager';

describe('LogManager', () => {
  let service: LogManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
