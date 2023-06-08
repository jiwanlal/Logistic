import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarrifdeleteComponent } from './tarrifdelete.component';

describe('TarrifdeleteComponent', () => {
  let component: TarrifdeleteComponent;
  let fixture: ComponentFixture<TarrifdeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarrifdeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarrifdeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
