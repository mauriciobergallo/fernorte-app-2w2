import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportTabComponent } from './report-tab.component';

describe('ReportTabComponent', () => {
  let component: ReportTabComponent;
  let fixture: ComponentFixture<ReportTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReportTabComponent]
    });
    fixture = TestBed.createComponent(ReportTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
