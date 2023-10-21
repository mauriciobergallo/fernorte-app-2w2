import { TestBed } from '@angular/core/testing';

import { SupliersService } from './supliers.service';

describe('SupliersService', () => {
  let service: SupliersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SupliersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
