import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimOrderContainerComponent } from './claim-order-container.component';

describe('ClaimOrderContainerComponent', () => {
  let component: ClaimOrderContainerComponent;
  let fixture: ComponentFixture<ClaimOrderContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClaimOrderContainerComponent]
    });
    fixture = TestBed.createComponent(ClaimOrderContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
