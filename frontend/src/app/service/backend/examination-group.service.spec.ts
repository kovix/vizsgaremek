import { TestBed } from '@angular/core/testing';

import { ExaminationGroupService } from './examination-group.service';

describe('ExaminationGroupService', () => {
  let service: ExaminationGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExaminationGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
