import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { ResetPasswordComponent } from './reset-password.component';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { SharedModule } from '../../shared/shared.module';

const primeNgModules = [ButtonModule, PasswordModule];

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    RouterLink,
    SharedModule,
    ...primeNgModules,
    ReactiveFormsModule,
  ],
})
export class ResetPasswordModule {}
