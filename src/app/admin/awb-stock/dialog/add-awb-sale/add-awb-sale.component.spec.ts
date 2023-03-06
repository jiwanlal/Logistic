import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwbSaleComponent } from './add-awb-sale.component';

describe('AddAwbSaleComponent', () => {
  let component: AddAwbSaleComponent;
  let fixture: ComponentFixture<AddAwbSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAwbSaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAwbSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
