import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAwbIssueComponent } from './add-awb-issue.component';

describe('AddAwbIssueComponent', () => {
  let component: AddAwbIssueComponent;
  let fixture: ComponentFixture<AddAwbIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAwbIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAwbIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
