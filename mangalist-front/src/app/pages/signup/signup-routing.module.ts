import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SignupComponent } from './signup.component';

const routes = [
  {
    path: '',
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupRoutingModule {}
