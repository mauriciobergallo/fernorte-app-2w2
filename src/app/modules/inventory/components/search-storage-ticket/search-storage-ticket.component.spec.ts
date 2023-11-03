import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStorageTicketComponent } from './search-storage-ticket.component';

describe('SearchStorageTicketComponent', () => {
  let component: SearchStorageTicketComponent;
  let fixture: ComponentFixture<SearchStorageTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchStorageTicketComponent]
    });
    fixture = TestBed.createComponent(SearchStorageTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
