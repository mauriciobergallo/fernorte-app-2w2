import { TestBed } from '@angular/core/testing';

import { ReportsServiceService } from './reports-service.service';

describe('ReportsServiceService', () => {
  let service: ReportsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
