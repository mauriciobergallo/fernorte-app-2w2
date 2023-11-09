/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ViewImageProductComponent } from './view-image-product.component';

describe('ViewImageProductComponent', () => {
  let component: ViewImageProductComponent;
  let fixture: ComponentFixture<ViewImageProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewImageProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewImageProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
