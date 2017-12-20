import { TestBed, inject } from '@angular/core/testing';

import { FusionService } from './fusion.service';

describe('FusionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FusionService]
    });
  });

  it('should be created', inject([FusionService], (service: FusionService) => {
    expect(service).toBeTruthy();
  }));
});
