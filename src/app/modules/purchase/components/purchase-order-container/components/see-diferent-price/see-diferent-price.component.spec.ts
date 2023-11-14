import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeDiferentPriceComponent } from './see-diferent-price.component';

describe('SeeDiferentPriceComponent', () => {
  let component: SeeDiferentPriceComponent;
  let fixture: ComponentFixture<SeeDiferentPriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeeDiferentPriceComponent]
    });
    fixture = TestBed.createComponent(SeeDiferentPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
