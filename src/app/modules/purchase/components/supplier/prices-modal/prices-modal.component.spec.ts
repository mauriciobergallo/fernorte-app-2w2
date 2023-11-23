import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricesModalComponent } from './prices-modal.component';

describe('PricesModalComponent', () => {
  let component: PricesModalComponent;
  let fixture: ComponentFixture<PricesModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PricesModalComponent]
    });
    fixture = TestBed.createComponent(PricesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
