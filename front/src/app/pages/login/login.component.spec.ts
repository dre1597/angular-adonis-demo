import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ToastModule } from 'primeng/toast';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const primeNgModules = [
    ButtonModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ...primeNgModules,
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty form', () => {
    expect(component['form'].valid).toBeFalsy();

    expect(component['form'].controls['email'].value).toBe('');
    expect(component['form'].controls['password'].value).toBe('');
  });

  it('should require email', () => {
    component['form'].setValue({
      email: '',
      password: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['email'].valid).toBeFalsy();
    expect(
      component['form'].controls['email'].hasError('required'),
    ).toBeTruthy();
  });

  it('should require valid email', () => {
    component['form'].setValue({
      email: 'invalid_email',
      password: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['email'].valid).toBeFalsy();
    expect(
      component['form'].controls['email'].hasError('pattern'),
    ).toBeTruthy();
  });

  it('should accept valid email', () => {
    component['form'].setValue({
      email: 'email@valid.com',
      password: 'any_password',
    });

    expect(component['form'].valid).toBeTruthy();
    expect(component['form'].controls['email'].valid).toBeTruthy();
  });

  it('should require password', () => {
    component['form'].setValue({
      email: 'email@valid.com',
      password: '',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('required'),
    ).toBeTruthy();
  });

  it('should validate password length', () => {
    component['form'].setValue({
      email: 'email@valid.com',
      password: 'a'.repeat(5),
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('minlength'),
    ).toBeTruthy();

    component['form'].setValue({
      email: 'email@valid.com',
      password: 'a'.repeat(6),
    });

    expect(component['form'].valid).toBeTruthy();
    expect(component['form'].controls['password'].valid).toBeTruthy();

    component['form'].setValue({
      email: 'email@valid.com',
      password: 'a'.repeat(24),
    });

    expect(component['form'].valid).toBeTruthy();
    expect(component['form'].controls['password'].valid).toBeTruthy();

    component['form'].setValue({
      email: 'email@valid.com',
      password: 'a'.repeat(25),
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('maxlength'),
    ).toBeTruthy();
  });

  it('should accept valid password', () => {
    component['form'].setValue({
      email: 'email@valid.com',
      password: 'any_password',
    });

    expect(component['form'].valid).toBeTruthy();
    expect(component['form'].controls['password'].valid).toBeTruthy();
  });
});
