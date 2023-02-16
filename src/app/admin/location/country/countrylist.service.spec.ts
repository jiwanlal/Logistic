import { TestBed } from '@angular/core/testing';

import { CountrylistService } from './countrylist.service';

describe('CountrylistService', () => {
  let service: CountrylistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountrylistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
