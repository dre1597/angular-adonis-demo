import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';

import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  const primeNgModules = [ButtonModule, InputTextModule, PasswordModule];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [SharedModule, ReactiveFormsModule, ...primeNgModules],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty form', () => {
    expect(component['form'].valid).toBeFalsy();

    expect(component['form'].controls['username'].value).toBe('');
    expect(component['form'].controls['email'].value).toBe('');
    expect(component['form'].controls['password'].value).toBe('');
    expect(component['form'].controls['confirmPassword'].value).toBe('');
  });

  it('should require username', () => {
    component['form'].setValue({
      username: '',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['username'].valid).toBeFalsy();
    expect(
      component['form'].controls['username'].hasError('required'),
    ).toBeTruthy();
  });

  it('should validate username length', () => {
    component['form'].setValue({
      username: 'a'.repeat(2),
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['username'].valid).toBeFalsy();
    expect(
      component['form'].controls['username'].hasError('minlength'),
    ).toBeTruthy();

    component['form'].setValue({
      username: 'a'.repeat(3),
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(
      component['form'].controls['username'].hasError('minlength'),
    ).toBeFalsy();

    component['form'].setValue({
      username: 'a'.repeat(24),
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(
      component['form'].controls['username'].hasError('maxlength'),
    ).toBeFalsy();

    component['form'].setValue({
      username: 'a'.repeat(25),
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['username'].valid).toBeFalsy();
    expect(
      component['form'].controls['username'].hasError('maxlength'),
    ).toBeTruthy();
  });

  it('should require email', () => {
    component['form'].setValue({
      username: 'any_username',
      email: '',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['email'].valid).toBeFalsy();
    expect(
      component['form'].controls['email'].hasError('required'),
    ).toBeTruthy();
  });

  it('should require valid email', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'invalid_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['email'].valid).toBeFalsy();
    expect(
      component['form'].controls['email'].hasError('pattern'),
    ).toBeTruthy();
  });

  it('should accept valid email', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email@example.com',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeTruthy();
    expect(component['form'].controls['email'].valid).toBeTruthy();
  });

  it('should require password', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: '',
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('required'),
    ).toBeTruthy();
  });

  it('should validate password length', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'a'.repeat(5),
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('minlength'),
    ).toBeTruthy();

    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'a'.repeat(6),
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['password'].valid).toBeTruthy();

    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'a'.repeat(24),
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['password'].valid).toBeTruthy();

    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'a'.repeat(25),
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('maxlength'),
    ).toBeTruthy();
  });

  it('should accept valid password', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['password'].valid).toBeTruthy();
  });

  it('should require confirm password', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: '',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['confirmPassword'].valid).toBeFalsy();
    expect(
      component['form'].controls['confirmPassword'].hasError('required'),
    ).toBeTruthy();
  });

  it('should validate confirm password length', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'a'.repeat(5),
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['confirmPassword'].valid).toBeFalsy();
    expect(
      component['form'].controls['confirmPassword'].hasError('minlength'),
    ).toBeTruthy();

    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'a'.repeat(6),
    });

    expect(
      component['form'].controls['confirmPassword'].hasError('minlength'),
    ).toBeFalsy();

    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'a'.repeat(24),
    });

    expect(
      component['form'].controls['confirmPassword'].hasError('minlength'),
    ).toBeFalsy();

    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'a'.repeat(25),
    });

    expect(component['form'].controls['confirmPassword'].valid).toBeFalsy();
    expect(
      component['form'].controls['confirmPassword'].hasError('maxlength'),
    ).toBeTruthy();
  });

  it('should accept valid confirm password', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['confirmPassword'].valid).toBeTruthy();
  });

  it('should validate if passwords match', () => {
    component['form'].setValue({
      username: 'any_username',
      email: 'any_email',
      password: 'any_password',
      confirmPassword: 'different_password',
    });

    expect(component['form'].valid).toBeFalsy();

    expect(component['form'].controls['confirmPassword'].valid).toBeFalsy();
    expect(
      component['form'].controls['confirmPassword'].hasError('matching'),
    ).toBeTruthy();
  });
});
