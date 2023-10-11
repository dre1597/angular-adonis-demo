import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { HttpClientModule } from '@angular/common/http';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [SignupService],
    });
    service = TestBed.inject(SignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
