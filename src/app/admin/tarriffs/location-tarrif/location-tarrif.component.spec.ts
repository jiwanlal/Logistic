import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationTarrifComponent } from './location-tarrif.component';

describe('LocationTarrifComponent', () => {
  let component: LocationTarrifComponent;
  let fixture: ComponentFixture<LocationTarrifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationTarrifComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationTarrifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
