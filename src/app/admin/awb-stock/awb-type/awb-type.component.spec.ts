import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwbTypeComponent } from './awb-type.component';

describe('AwbTypeComponent', () => {
  let component: AwbTypeComponent;
  let fixture: ComponentFixture<AwbTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwbTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwbTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
