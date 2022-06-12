import { TestBed } from '@angular/core/testing';

import { CountReporterService } from './count-reporter.service';

describe('CountReporterService', () => {
  let service: CountReporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountReporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
