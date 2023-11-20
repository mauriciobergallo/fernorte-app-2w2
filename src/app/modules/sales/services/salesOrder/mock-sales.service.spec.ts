import { TestBed } from '@angular/core/testing';

import { MockSalesService } from './mock-sales.service';

describe('MockSalesService', () => {
  let service: MockSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
