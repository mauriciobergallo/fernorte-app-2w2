import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalSidebarComponent } from './total-sidebar.component';

describe('TotalSidebarComponent', () => {
  let component: TotalSidebarComponent;
  let fixture: ComponentFixture<TotalSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotalSidebarComponent]
    });
    fixture = TestBed.createComponent(TotalSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
