import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnCustomerComponent } from './btn-customer.component';

describe('BtnCustomerComponent', () => {
  let component: BtnCustomerComponent;
  let fixture: ComponentFixture<BtnCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BtnCustomerComponent]
    });
    fixture = TestBed.createComponent(BtnCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
