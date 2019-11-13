import { TestBed } from '@angular/core/testing';

import { HistoricaldataService } from './historicaldata.service';

describe('HistoricaldataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistoricaldataService = TestBed.get(HistoricaldataService);
    expect(service).toBeTruthy();
  });
});
