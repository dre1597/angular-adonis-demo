import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SignupModule } from './pages/signup/signup.module';
import { LoginModule } from './pages/login/login.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SignupModule, LoginModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
