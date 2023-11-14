import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInventoryMovementsComponent } from './search-inventory-movements.component';

describe('SearchInventoryMovementsComponent', () => {
  let component: SearchInventoryMovementsComponent;
  let fixture: ComponentFixture<SearchInventoryMovementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchInventoryMovementsComponent]
    });
    fixture = TestBed.createComponent(SearchInventoryMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
