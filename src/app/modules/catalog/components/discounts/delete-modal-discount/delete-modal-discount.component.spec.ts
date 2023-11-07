import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalDiscountComponent } from './delete-modal-discount.component';

describe('DeleteModalDiscountComponent', () => {
  let component: DeleteModalDiscountComponent;
  let fixture: ComponentFixture<DeleteModalDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalDiscountComponent]
    });
    fixture = TestBed.createComponent(DeleteModalDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
