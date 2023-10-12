import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { EnvService } from '../../services/env.service';

type SignUpProps = {
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class SignupService {
  private readonly envService = inject(EnvService);
  private readonly http = inject(HttpClient);

  public signup(user: SignUpProps): Observable<void> {
    const baseUrl = this.envService.env?.apiUrl + '/auth/signup';
    return this.http.post<void>(baseUrl, user);
  }
}
