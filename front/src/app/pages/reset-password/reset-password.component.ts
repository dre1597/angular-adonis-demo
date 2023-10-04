import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { matchValidator } from '../../utils/confirm-password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  protected form!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.createForm();
  }

  protected submitForm(): void {
    console.log(this.form.value);
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
