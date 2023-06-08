import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarrifaddComponent } from './tarrifadd.component';

describe('TarrifaddComponent', () => {
  let component: TarrifaddComponent;
  let fixture: ComponentFixture<TarrifaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarrifaddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarrifaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
