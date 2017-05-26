import { TestBed, inject } from '@angular/core/testing';

import { NuccoreService } from './nuccore.service';

describe('NuccoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NuccoreService]
    });
  });

  it('should ...', inject([NuccoreService], (service: NuccoreService) => {
    expect(service).toBeTruthy();
  }));
});
