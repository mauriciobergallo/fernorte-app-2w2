import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersGridComponent } from './orders-grid.component';

describe('OrdersGridComponent', () => {
  let component: OrdersGridComponent;
  let fixture: ComponentFixture<OrdersGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersGridComponent]
    });
    fixture = TestBed.createComponent(OrdersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
