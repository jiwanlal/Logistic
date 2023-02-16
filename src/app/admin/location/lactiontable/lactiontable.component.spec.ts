import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LactiontableComponent } from './lactiontable.component';

describe('LactiontableComponent', () => {
  let component: LactiontableComponent;
  let fixture: ComponentFixture<LactiontableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LactiontableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LactiontableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
