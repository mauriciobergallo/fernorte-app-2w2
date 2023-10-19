import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSuplierComponent } from './list-suplier.component';

describe('ListSuplierComponent', () => {
  let component: ListSuplierComponent;
  let fixture: ComponentFixture<ListSuplierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListSuplierComponent]
    });
    fixture = TestBed.createComponent(ListSuplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
