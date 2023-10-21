import { TestBed } from '@angular/core/testing';

import { PurchaseOrderServiceService } from './purchase-order-service.service';

describe('PurchaseOrderServiceService', () => {
  let service: PurchaseOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
