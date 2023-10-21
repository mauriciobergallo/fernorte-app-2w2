import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderContainerComponent } from './payment-order-container.component';

describe('PaymentOrderContainerComponent', () => {
  let component: PaymentOrderContainerComponent;
  let fixture: ComponentFixture<PaymentOrderContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentOrderContainerComponent]
    });
    fixture = TestBed.createComponent(PaymentOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
