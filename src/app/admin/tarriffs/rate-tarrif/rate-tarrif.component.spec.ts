import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateTarrifComponent } from './rate-tarrif.component';

describe('RateTarrifComponent', () => {
  let component: RateTarrifComponent;
  let fixture: ComponentFixture<RateTarrifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RateTarrifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateTarrifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
