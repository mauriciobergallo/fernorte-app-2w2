import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderContainerComponent } from './purchase-order-container.component';

describe('PurchaseOrderContainerComponent', () => {
  let component: PurchaseOrderContainerComponent;
  let fixture: ComponentFixture<PurchaseOrderContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderContainerComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
