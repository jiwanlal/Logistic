import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwbPurchaseComponent } from './awb-purchase.component';

describe('AwbPurchaseComponent', () => {
  let component: AwbPurchaseComponent;
  let fixture: ComponentFixture<AwbPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwbPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwbPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
