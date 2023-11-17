import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentPreviewComponent } from './payment-preview.component';

describe('PaymentPreviewComponent', () => {
  let component: PaymentPreviewComponent;
  let fixture: ComponentFixture<PaymentPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentPreviewComponent]
    });
    fixture = TestBed.createComponent(PaymentPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
