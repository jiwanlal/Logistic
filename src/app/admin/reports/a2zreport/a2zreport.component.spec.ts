import { ComponentFixture, TestBed } from '@angular/core/testing';

import { A2zreportComponent } from './a2zreport.component';

describe('A2zreportComponent', () => {
  let component: A2zreportComponent;
  let fixture: ComponentFixture<A2zreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ A2zreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(A2zreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
