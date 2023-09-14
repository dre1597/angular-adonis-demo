import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResetPasswordComponent } from './reset-password.component';

const routes = [
  {
    path: '',
    component: ResetPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
