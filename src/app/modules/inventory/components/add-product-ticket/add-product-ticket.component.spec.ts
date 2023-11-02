import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductTicketComponent } from './add-product-ticket.component';

describe('AddProductTicketComponent', () => {
  let component: AddProductTicketComponent;
  let fixture: ComponentFixture<AddProductTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductTicketComponent]
    });
    fixture = TestBed.createComponent(AddProductTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
