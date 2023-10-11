import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { matchValidator } from '../../utils/confirm-password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
  protected form!: FormGroup;

  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private token?: string;

  protected get password() {
    return this.form.get('password');
  }

  protected get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (!params['token']) {
          this.router.navigate(['/login'], {
            queryParams: {
              missingToken: true,
            },
          });
        }
        this.token = params['token'];
      });
  }

  protected submitForm(): void {
    console.log(this.form.value);
    console.log(this.token);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          matchValidator('confirmPassword', true),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          matchValidator('password'),
        ],
      ],
    });
  }
}
