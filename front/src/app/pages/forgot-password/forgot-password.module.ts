import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../shared/shared.module';
import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';

const primeNgModules = [ButtonModule, InputTextModule];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    SharedModule,
    RouterLink,
    ReactiveFormsModule,
    ...primeNgModules,
  ],
})
export class ForgotPasswordModule {}
