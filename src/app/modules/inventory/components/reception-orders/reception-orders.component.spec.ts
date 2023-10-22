import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionOrdersComponent } from './reception-orders.component';

describe('ReceptionOrdersComponent', () => {
  let component: ReceptionOrdersComponent;
  let fixture: ComponentFixture<ReceptionOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReceptionOrdersComponent]
    });
    fixture = TestBed.createComponent(ReceptionOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
