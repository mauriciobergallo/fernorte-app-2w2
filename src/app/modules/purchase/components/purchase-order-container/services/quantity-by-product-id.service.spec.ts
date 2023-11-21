import { TestBed } from '@angular/core/testing';

import { QuantityByProductIdService } from './quantity-by-product-id.service';

describe('QuantityByProductIdService', () => {
  let service: QuantityByProductIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantityByProductIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
