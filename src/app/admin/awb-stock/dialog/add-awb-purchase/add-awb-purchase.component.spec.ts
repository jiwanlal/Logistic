import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwbPurchaseComponent } from './add-awb-purchase.component';

describe('AddAwbPurchaseComponent', () => {
  let component: AddAwbPurchaseComponent;
  let fixture: ComponentFixture<AddAwbPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAwbPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAwbPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
