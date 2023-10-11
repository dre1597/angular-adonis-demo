import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

type EnvVariables = {
  apiUrl: string;
};

@Injectable({
  providedIn: 'root',
})
export class EnvService {
  public env?: EnvVariables;
  public value = 'test';
  private readonly http = inject(HttpClient);

  public async loadEnv(): Promise<void> {
    const env$ = this.http.get<EnvVariables>('/assets/env.json');
    this.env = await lastValueFrom(env$);
  }
}
