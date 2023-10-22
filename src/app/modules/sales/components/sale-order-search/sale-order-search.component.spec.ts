import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderSearchComponent } from './sale-order-search.component';

describe('SaleOrderSearchComponent', () => {
  let component: SaleOrderSearchComponent;
  let fixture: ComponentFixture<SaleOrderSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderSearchComponent]
    });
    fixture = TestBed.createComponent(SaleOrderSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
