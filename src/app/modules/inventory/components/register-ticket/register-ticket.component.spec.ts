import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterTicketComponent } from './register-ticket.component';

describe('RegisterTicketComponent', () => {
  let component: RegisterTicketComponent;
  let fixture: ComponentFixture<RegisterTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterTicketComponent]
    });
    fixture = TestBed.createComponent(RegisterTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
