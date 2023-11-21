import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentInventoryComponent } from './current-inventory.component';

describe('CurrentInventoryComponent', () => {
  let component: CurrentInventoryComponent;
  let fixture: ComponentFixture<CurrentInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentInventoryComponent]
    });
    fixture = TestBed.createComponent(CurrentInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
