import { TestBed } from '@angular/core/testing';

import { PaymentOrderServiceService } from './payment-order-service.service';

describe('PaymentOrderServiceService', () => {
  let service: PaymentOrderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentOrderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
