import { TestBed } from '@angular/core/testing';

import { AwbsearchService } from './awbsearch.service';

describe('AwbsearchService', () => {
  let service: AwbsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwbsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
