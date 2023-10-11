import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { EnvService } from './env.service';

describe('EnvService', () => {
  let service: EnvService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(EnvService);
  });

  it('should be created', async () => {
    expect(service).toBeTruthy();
  });
});
