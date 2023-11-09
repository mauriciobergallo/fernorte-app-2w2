import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstLoginComponent } from './first-login.component';

describe('FirstLoginComponent', () => {
  let component: FirstLoginComponent;
  let fixture: ComponentFixture<FirstLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FirstLoginComponent]
    });
    fixture = TestBed.createComponent(FirstLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
