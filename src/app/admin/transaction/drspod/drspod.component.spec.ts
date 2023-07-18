import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrspodComponent } from './drspod.component';

describe('DrspodComponent', () => {
  let component: DrspodComponent;
  let fixture: ComponentFixture<DrspodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrspodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrspodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
