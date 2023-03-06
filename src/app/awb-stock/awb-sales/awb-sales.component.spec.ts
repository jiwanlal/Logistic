import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwbSalesComponent } from './awb-sales.component';

describe('AwbSalesComponent', () => {
  let component: AwbSalesComponent;
  let fixture: ComponentFixture<AwbSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwbSalesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwbSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
