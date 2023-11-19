import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMovementComponent } from './create-movement.component';

describe('CreateMovementComponent', () => {
  let component: CreateMovementComponent;
  let fixture: ComponentFixture<CreateMovementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMovementComponent]
    });
    fixture = TestBed.createComponent(CreateMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
