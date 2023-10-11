import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SignupService } from './signup.service';

const primeNgModules = [ButtonModule, InputTextModule, PasswordModule];

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    SignupRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...primeNgModules,
  ],
  providers: [SignupService],
})
export class SignupModule {}
