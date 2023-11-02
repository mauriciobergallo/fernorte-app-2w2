import { TestBed } from '@angular/core/testing';

import { DeliverOrderService } from './deliver-order.service';

describe('DeliverOrderService', () => {
  let service: DeliverOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliverOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
