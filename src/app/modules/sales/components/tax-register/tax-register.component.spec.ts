import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxRegisterComponent } from './tax-register.component';

describe('TaxRegisterComponent', () => {
  let component: TaxRegisterComponent;
  let fixture: ComponentFixture<TaxRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxRegisterComponent]
    });
    fixture = TestBed.createComponent(TaxRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
