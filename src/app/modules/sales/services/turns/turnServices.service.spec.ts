/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TurnServicesService } from './turnServices.service';

describe('Service: TurnServices', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TurnServicesService]
    });
  });

  it('should ...', inject([TurnServicesService], (service: TurnServicesService) => {
    expect(service).toBeTruthy();
  }));
});
