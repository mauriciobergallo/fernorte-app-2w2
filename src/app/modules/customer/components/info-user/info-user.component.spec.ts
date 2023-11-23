import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUserComponent } from './info-user.component';

describe('InfoUserComponent', () => {
  let component: InfoUserComponent;
  let fixture: ComponentFixture<InfoUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoUserComponent]
    });
    fixture = TestBed.createComponent(InfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
