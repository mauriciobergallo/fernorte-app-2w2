import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModalCategoryComponent } from './delete-modal-category.component';

describe('DeleteModalCategoryComponent', () => {
  let component: DeleteModalCategoryComponent;
  let fixture: ComponentFixture<DeleteModalCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteModalCategoryComponent]
    });
    fixture = TestBed.createComponent(DeleteModalCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
