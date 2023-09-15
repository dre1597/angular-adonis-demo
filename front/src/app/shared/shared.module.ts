import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { FormCardComponent } from './form/form-card.component';
import { PasswordInputComponent } from './form/password-input.component';
import { InputGroupComponent } from './form/input-group.component';
import { TextInputComponent } from './form/text-input.component';
import { ReactiveFormsModule } from '@angular/forms';

const primeNgModules = [CardModule, PasswordModule, InputTextModule];

@NgModule({
  declarations: [
    FormCardComponent,
    PasswordInputComponent,
    InputGroupComponent,
    TextInputComponent,
  ],
  imports: [CommonModule, ...primeNgModules, ReactiveFormsModule],
  exports: [
    FormCardComponent,
    PasswordInputComponent,
    InputGroupComponent,
    TextInputComponent,
  ],
})
export class SharedModule {}
