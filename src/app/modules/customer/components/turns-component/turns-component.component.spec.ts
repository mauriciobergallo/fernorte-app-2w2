import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnsComponentComponent } from './turns-component.component';

describe('TurnsComponentComponent', () => {
  let component: TurnsComponentComponent;
  let fixture: ComponentFixture<TurnsComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TurnsComponentComponent]
    });
    fixture = TestBed.createComponent(TurnsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
