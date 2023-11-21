import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductModalComponent } from './add-product-modal.component';

describe('AddProductModalComponent', () => {
  let component: AddProductModalComponent;
  let fixture: ComponentFixture<AddProductModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddProductModalComponent]
    });
    fixture = TestBed.createComponent(AddProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
