import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxNavComponent } from './tax-nav.component';

describe('TaxNavComponent', () => {
  let component: TaxNavComponent;
  let fixture: ComponentFixture<TaxNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaxNavComponent]
    });
    fixture = TestBed.createComponent(TaxNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
