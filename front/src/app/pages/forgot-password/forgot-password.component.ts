import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  protected forgotPasswordForm = new FormGroup({
    email: new FormControl('', Validators.required),
  });

  protected submitForm(): void {
    console.log(this.forgotPasswordForm.value);
  }
}
