import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SignupModule } from './pages/signup/signup.module';
import { LoginModule } from './pages/login/login.module';
import { ForgotPasswordModule } from './pages/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './pages/reset-password/reset-password.module';
import { HomeModule } from './pages/home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SignupModule,
    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    HomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
