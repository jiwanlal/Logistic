import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwbTypeComponent } from './add-awb-type.component';

describe('AddAwbTypeComponent', () => {
  let component: AddAwbTypeComponent;
  let fixture: ComponentFixture<AddAwbTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAwbTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAwbTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
