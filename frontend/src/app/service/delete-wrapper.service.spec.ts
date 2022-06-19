import { TestBed } from '@angular/core/testing';

import { DeleteWrapperService } from './delete-wrapper.service';

describe('DeleteWrapperService', () => {
  let service: DeleteWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
