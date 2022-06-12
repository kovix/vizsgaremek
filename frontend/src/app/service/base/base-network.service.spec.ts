import { TestBed } from '@angular/core/testing';

import { BaseNetworkService } from './base-network.service';

describe('BaseNetworkService', () => {
  let service: BaseNetworkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseNetworkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
