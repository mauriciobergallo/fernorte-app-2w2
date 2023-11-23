import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficsComponent } from './grafics.component';

describe('GraficsComponent', () => {
  let component: GraficsComponent;
  let fixture: ComponentFixture<GraficsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraficsComponent]
    });
    fixture = TestBed.createComponent(GraficsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
