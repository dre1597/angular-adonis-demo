import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../../shared/shared.module';

const primeNgModules = [ButtonModule];

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, LoginRoutingModule, SharedModule, ...primeNgModules],
  exports: [],
})
export class LoginModule {}
