import { TestBed } from '@angular/core/testing';

import { CardLayoutService } from './mas-3i-card-layout.service';

describe('CardLayoutService', () => {
  let service: CardLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
