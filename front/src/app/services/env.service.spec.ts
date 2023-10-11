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

  it('should load env', async () => {
    expect(service.env).toBeFalsy();
    await service.loadEnv();
    expect(service.env).toBeTruthy();
  });

  it('should have api url', async () => {
    await service.loadEnv();
    expect(service.env).toBeTruthy();
    expect(service.env?.apiUrl).toBeDefined();
  });
});
