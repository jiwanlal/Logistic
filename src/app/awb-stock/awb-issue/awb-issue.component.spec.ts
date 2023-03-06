import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwbIssueComponent } from './awb-issue.component';

describe('AwbIssueComponent', () => {
  let component: AwbIssueComponent;
  let fixture: ComponentFixture<AwbIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AwbIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwbIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
