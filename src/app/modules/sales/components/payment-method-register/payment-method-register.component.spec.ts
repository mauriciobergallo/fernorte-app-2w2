import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodRegisterComponent } from './payment-method-register.component';

describe('PaymentMethodRegisterComponent', () => {
  let component: PaymentMethodRegisterComponent;
  let fixture: ComponentFixture<PaymentMethodRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodRegisterComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
