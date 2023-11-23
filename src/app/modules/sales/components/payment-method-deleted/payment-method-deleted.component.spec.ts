import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodDeletedComponent } from './payment-method-deleted.component';

describe('PaymentMethodDeletedComponent', () => {
  let component: PaymentMethodDeletedComponent;
  let fixture: ComponentFixture<PaymentMethodDeletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentMethodDeletedComponent]
    });
    fixture = TestBed.createComponent(PaymentMethodDeletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
