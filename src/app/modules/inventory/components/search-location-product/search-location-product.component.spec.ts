import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLocationProductComponent } from './search-location-product.component';

describe('SearchLocationProductComponent', () => {
  let component: SearchLocationProductComponent;
  let fixture: ComponentFixture<SearchLocationProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchLocationProductComponent]
    });
    fixture = TestBed.createComponent(SearchLocationProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
