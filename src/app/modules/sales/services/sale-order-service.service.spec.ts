import { TestBed } from '@angular/core/testing';

import { SaleOrderServiceService } from './sale-order-service.service';

describe('SaleOrderServiceService', () => {
  let service: SaleOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaleOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
