import { TestBed } from '@angular/core/testing';

import { BillServiceService } from './bill-service.service';

describe('BillServiceService', () => {
  let service: BillServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
