import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MessageService } from 'primeng/api';

import { EMAIL_REGEX } from '../../utils/regex';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [MessageService],
})
export class LoginComponent implements OnInit, AfterViewInit {
  protected form!: FormGroup;

  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  protected get email() {
    return this.form.get('email');
  }

  protected get password() {
    return this.form.get('password');
  }

  public ngOnInit(): void {
    this.createForm();
  }

  public ngAfterViewInit(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        if (params['missingToken'] === 'true') {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Reset password token is missing',
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
      });
  }

  protected submitForm(): void {
    console.log(this.form.value);
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_REGEX)]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(24),
        ],
      ],
    });
  }
}
