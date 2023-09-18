import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';

import { FormCardComponent } from './components/form-card.component';

const primeNgModules = [CardModule];

@NgModule({
  declarations: [FormCardComponent],
  imports: [CommonModule, ReactiveFormsModule, ...primeNgModules],
  exports: [FormCardComponent],
})
export class SharedModule {}
