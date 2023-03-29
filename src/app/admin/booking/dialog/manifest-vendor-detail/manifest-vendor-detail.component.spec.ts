import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManifestVendorDetailComponent } from './manifest-vendor-detail.component';

describe('ManifestVendorDetailComponent', () => {
  let component: ManifestVendorDetailComponent;
  let fixture: ComponentFixture<ManifestVendorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManifestVendorDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManifestVendorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
