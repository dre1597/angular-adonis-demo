import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';

import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { SharedModule } from '../../shared/shared.module';

const primeNgModules = [InputTextModule, PasswordModule, ButtonModule];

@NgModule({
  declarations: [SignupComponent],
  imports: [CommonModule, SignupRoutingModule, SharedModule, ...primeNgModules],
  providers: [],
})
export class SignupModule {}
