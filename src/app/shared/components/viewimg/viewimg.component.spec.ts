import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewimgComponent } from './viewimg.component';

describe('ViewimgComponent', () => {
  let component: ViewimgComponent;
  let fixture: ComponentFixture<ViewimgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewimgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewimgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
