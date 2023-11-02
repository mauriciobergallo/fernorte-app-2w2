import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultOrderComponent } from './consult-order.component';

describe('ConsultOrderComponent', () => {
  let component: ConsultOrderComponent;
  let fixture: ComponentFixture<ConsultOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultOrderComponent]
    });
    fixture = TestBed.createComponent(ConsultOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
