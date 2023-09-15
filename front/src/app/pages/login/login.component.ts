import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { EMAIL_REGEX } from '../../utils/regex';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  protected form!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  protected submitForm(): void {
    console.log(this.form.value);
  }
}
