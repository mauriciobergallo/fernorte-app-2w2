import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLocationComponent } from './form-location.component';

describe('FormLocationComponent', () => {
  let component: FormLocationComponent;
  let fixture: ComponentFixture<FormLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormLocationComponent]
    });
    fixture = TestBed.createComponent(FormLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
