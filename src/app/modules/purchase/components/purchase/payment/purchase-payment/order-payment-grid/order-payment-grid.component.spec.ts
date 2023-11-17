import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPaymentGridComponent } from './order-payment-grid.component';

describe('OrderPaymentGridComponent', () => {
  let component: OrderPaymentGridComponent;
  let fixture: ComponentFixture<OrderPaymentGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderPaymentGridComponent]
    });
    fixture = TestBed.createComponent(OrderPaymentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
