import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingSearchListComponent } from './billing-search-list.component';

describe('BillingSearchListComponent', () => {
  let component: BillingSearchListComponent;
  let fixture: ComponentFixture<BillingSearchListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BillingSearchListComponent]
    });
    fixture = TestBed.createComponent(BillingSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
