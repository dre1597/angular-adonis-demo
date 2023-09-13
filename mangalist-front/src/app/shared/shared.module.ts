import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';

import { FormCardComponent } from './form/form-card.component';
import { PasswordInputComponent } from './form/password-input.component';
import { InputGroupComponent } from './form/input-group.component';

const primeNgModules = [CardModule, PasswordModule];

@NgModule({
  declarations: [
    FormCardComponent,
    PasswordInputComponent,
    InputGroupComponent,
  ],
  imports: [CommonModule, ...primeNgModules],
  exports: [FormCardComponent, PasswordInputComponent, InputGroupComponent],
})
export class SharedModule {}
