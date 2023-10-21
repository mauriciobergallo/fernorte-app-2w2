import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOrderGridComponent } from './payment-order-grid.component';

describe('PaymentOrderGridComponent', () => {
  let component: PaymentOrderGridComponent;
  let fixture: ComponentFixture<PaymentOrderGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentOrderGridComponent]
    });
    fixture = TestBed.createComponent(PaymentOrderGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
