import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EMAIL_REGEX } from '../../utils/regex';
import { matchValidator } from '../../utils/confirm-password.validator';
import { SignupService } from './signup.service';

type SignUpForm = {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  protected form!: FormGroup<SignUpForm>;

  private readonly signupService = inject(SignupService);

  protected get username() {
    return this.form.get('username');
  }

  protected get email() {
    return this.form.get('email');
  }

  protected get password() {
    return this.form.get('password');
  }

  protected get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  public ngOnInit(): void {
    this.createForm();
  }

  protected submitForm(): void {
    const values = this.form.value;
    this.signupService.signUp(
      values.username!,
      values.email!,
      values.password!,
    );
  }

  private createForm(): void {
    this.form = new FormGroup<SignUpForm>({
      username: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern(EMAIL_REGEX)],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          matchValidator('confirmPassword', true),
        ],
      }),
      confirmPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
          matchValidator('password'),
        ],
      }),
    });
  }
}
