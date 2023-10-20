import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageAvailabilityComponent } from './storage-availability.component';

describe('StorageAvailabilityComponent', () => {
  let component: StorageAvailabilityComponent;
  let fixture: ComponentFixture<StorageAvailabilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorageAvailabilityComponent]
    });
    fixture = TestBed.createComponent(StorageAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
