import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderViewComponent } from './sale-order-view.component';

describe('SaleOrderViewComponent', () => {
  let component: SaleOrderViewComponent;
  let fixture: ComponentFixture<SaleOrderViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderViewComponent]
    });
    fixture = TestBed.createComponent(SaleOrderViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
