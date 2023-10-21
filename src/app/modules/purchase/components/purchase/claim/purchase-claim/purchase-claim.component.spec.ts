import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseClaimComponent } from './purchase-claim.component';

describe('PurchaseClaimComponent', () => {
  let component: PurchaseClaimComponent;
  let fixture: ComponentFixture<PurchaseClaimComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseClaimComponent]
    });
    fixture = TestBed.createComponent(PurchaseClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
