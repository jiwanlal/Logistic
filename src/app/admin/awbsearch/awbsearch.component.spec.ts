import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwbsearchComponent } from './awbsearch.component';

describe('AwbsearchComponent', () => {
  let component: AwbsearchComponent;
  let fixture: ComponentFixture<AwbsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwbsearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwbsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
