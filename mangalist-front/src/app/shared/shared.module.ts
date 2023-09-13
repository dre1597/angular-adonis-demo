import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';

import { FormCardComponent } from './form/card/form-card.component';

const primeNgModules = [CardModule];

@NgModule({
  declarations: [FormCardComponent],
  imports: [CommonModule, ...primeNgModules],
  exports: [FormCardComponent],
})
export class SharedModule {}
