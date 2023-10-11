import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ToastModule } from 'primeng/toast';

const primeNgModules = [
  ButtonModule,
  PasswordModule,
  InputTextModule,
  ToastModule,
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ...primeNgModules,
  ],
  exports: [],
})
export class LoginModule {}
