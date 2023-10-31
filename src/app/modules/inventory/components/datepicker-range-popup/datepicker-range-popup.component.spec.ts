import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerRangePopupComponent } from './datepicker-range-popup.component';

describe('DatepickerRangePopupComponent', () => {
  let component: DatepickerRangePopupComponent;
  let fixture: ComponentFixture<DatepickerRangePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatepickerRangePopupComponent]
    });
    fixture = TestBed.createComponent(DatepickerRangePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
