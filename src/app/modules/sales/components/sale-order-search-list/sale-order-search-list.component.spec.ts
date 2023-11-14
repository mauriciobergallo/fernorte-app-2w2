import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleOrderSearchListComponent } from './sale-order-search-list.component';

describe('SaleOrderSearchListComponent', () => {
  let component: SaleOrderSearchListComponent;
  let fixture: ComponentFixture<SaleOrderSearchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SaleOrderSearchListComponent]
    });
    fixture = TestBed.createComponent(SaleOrderSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
