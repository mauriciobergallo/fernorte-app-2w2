import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnNoCustomerComponent } from './btn-no-customer.component';

describe('BtnNoCustomerComponent', () => {
  let component: BtnNoCustomerComponent;
  let fixture: ComponentFixture<BtnNoCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnNoCustomerComponent]
    });
    fixture = TestBed.createComponent(BtnNoCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
