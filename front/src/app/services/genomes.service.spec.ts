import { TestBed, inject } from '@angular/core/testing';

import { GenomesService } from './genomes.service';

describe('GenomesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenomesService]
    });
  });

  it('should ...', inject([GenomesService], (service: GenomesService) => {
    expect(service).toBeTruthy();
  }));
});
