import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSupplierComponent } from './add-supplier.component';

describe('AddSupplierComponent', () => {
  let component: AddSupplierComponent;
  let fixture: ComponentFixture<AddSupplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSupplierComponent]
    });
    fixture = TestBed.createComponent(AddSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
