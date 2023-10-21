import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePaymentComponent } from './purchase-payment.component';

describe('PurchasePaymentComponent', () => {
  let component: PurchasePaymentComponent;
  let fixture: ComponentFixture<PurchasePaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasePaymentComponent]
    });
    fixture = TestBed.createComponent(PurchasePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
