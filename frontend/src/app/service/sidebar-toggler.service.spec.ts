import { TestBed } from '@angular/core/testing';

import { SidebarTogglerService } from './sidebar-toggler.service';

describe('SidebarTogglerService', () => {
  let service: SidebarTogglerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidebarTogglerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
