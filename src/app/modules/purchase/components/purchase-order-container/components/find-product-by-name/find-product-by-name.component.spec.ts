import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindProductByNameComponent } from './find-product-by-name.component';

describe('FindProductByNameComponent', () => {
  let component: FindProductByNameComponent;
  let fixture: ComponentFixture<FindProductByNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindProductByNameComponent]
    });
    fixture = TestBed.createComponent(FindProductByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
