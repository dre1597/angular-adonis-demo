import { inject, Injectable } from '@angular/core';

import { EnvService } from '../../services/env.service';

type UserRegister = {
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class SignupService {
  private readonly envService = inject(EnvService);

  public signUp(username: string, email: string, password: string) {
    console.log(username, email, password);
    console.log(this.envService.env);
  }
}
