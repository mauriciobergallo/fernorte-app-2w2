import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalResumeComponent } from './total-resume.component';

describe('TotalResumeComponent', () => {
  let component: TotalResumeComponent;
  let fixture: ComponentFixture<TotalResumeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalResumeComponent]
    });
    fixture = TestBed.createComponent(TotalResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
