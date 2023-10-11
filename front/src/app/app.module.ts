import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignupModule } from './pages/signup/signup.module';
import { LoginModule } from './pages/login/login.module';
import { ForgotPasswordModule } from './pages/forgot-password/forgot-password.module';
import { ResetPasswordModule } from './pages/reset-password/reset-password.module';
import { HomeModule } from './pages/home/home.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnvService } from './services/env.service';

export const envFactory = (envService: EnvService) => {
  return () => envService.loadEnv();
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SignupModule,
    LoginModule,
    ForgotPasswordModule,
    ResetPasswordModule,
    HomeModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: envFactory,
      deps: [EnvService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
