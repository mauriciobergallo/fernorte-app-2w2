import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderSearchFilterComponent } from './sale-order-search-filter.component';

describe('SaleOrderSearchFilterComponent', () => {
  let component: SaleOrderSearchFilterComponent;
  let fixture: ComponentFixture<SaleOrderSearchFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderSearchFilterComponent]
    });
    fixture = TestBed.createComponent(SaleOrderSearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
