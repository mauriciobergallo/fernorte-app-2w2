import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderSearchHandlerComponent } from './sale-order-search-handler.component';

describe('SaleOrderSearchHandlerComponent', () => {
  let component: SaleOrderSearchHandlerComponent;
  let fixture: ComponentFixture<SaleOrderSearchHandlerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderSearchHandlerComponent]
    });
    fixture = TestBed.createComponent(SaleOrderSearchHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
