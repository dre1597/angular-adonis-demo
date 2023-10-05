import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EMAIL_REGEX } from '../../utils/regex';
import { matchValidator } from '../../utils/confirm-password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  protected form!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

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
    console.log(this.form.value);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(24),
        ],
      ],
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
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
