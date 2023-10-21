import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HedearSupplierComponent } from './hedear-supplier.component';

describe('HedearSupplierComponent', () => {
  let component: HedearSupplierComponent;
  let fixture: ComponentFixture<HedearSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HedearSupplierComponent]
    });
    fixture = TestBed.createComponent(HedearSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
