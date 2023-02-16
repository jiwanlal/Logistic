import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationdeleteComponent } from './locationdelete.component';

describe('LocationdeleteComponent', () => {
  let component: LocationdeleteComponent;
  let fixture: ComponentFixture<LocationdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
