import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

const primeNgModules = [ButtonModule];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    RouterLink,
    SharedModule,
    ReactiveFormsModule,
    ...primeNgModules,
  ],
})
export class ForgotPasswordModule {}