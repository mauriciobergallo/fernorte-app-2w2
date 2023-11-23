import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMovimientoComponent } from './edit-movimiento.component';

describe('EditMovimientoComponent', () => {
  let component: EditMovimientoComponent;
  let fixture: ComponentFixture<EditMovimientoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMovimientoComponent]
    });
    fixture = TestBed.createComponent(EditMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
