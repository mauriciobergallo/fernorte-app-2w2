import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductTicketComponent } from './list-product-ticket.component';

describe('ListProductTicketComponent', () => {
  let component: ListProductTicketComponent;
  let fixture: ComponentFixture<ListProductTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListProductTicketComponent]
    });
    fixture = TestBed.createComponent(ListProductTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
