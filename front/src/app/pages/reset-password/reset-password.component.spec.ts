import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';

import { SharedModule } from '../../shared/shared.module';
import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  const primeNgModules = [ButtonModule, PasswordModule];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [
        SharedModule,
        ReactiveFormsModule,
        RouterTestingModule,
        ...primeNgModules,
      ],
    });
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty form', () => {
    expect(component['form'].valid).toBeFalsy();

    expect(component['form'].controls['password'].value).toBe('');
    expect(component['form'].controls['confirmPassword'].value).toBe('');
  });

  it('should require password', () => {
    component['form'].setValue({
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
      password: 'a'.repeat(5),
      confirmPassword: 'any_password',
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['password'].valid).toBeFalsy();
    expect(
      component['form'].controls['password'].hasError('minlength'),
    ).toBeTruthy();

    component['form'].setValue({
      password: 'a'.repeat(6),
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['password'].valid).toBeTruthy();

    component['form'].setValue({
      password: 'a'.repeat(24),
      confirmPassword: 'any_password',
    });

    expect(
      component['form'].controls['password'].hasError('maxlength'),
    ).toBeFalsy();

    component['form'].setValue({
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
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['password'].valid).toBeTruthy();
  });

  it('should require confirm password', () => {
    component['form'].setValue({
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
      password: 'any_password',
      confirmPassword: 'a'.repeat(5),
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['confirmPassword'].valid).toBeFalsy();
    expect(
      component['form'].controls['confirmPassword'].hasError('minlength'),
    ).toBeTruthy();

    component['form'].setValue({
      password: 'any_password',
      confirmPassword: 'a'.repeat(6),
    });

    expect(
      component['form'].controls['confirmPassword'].hasError('minlength'),
    ).toBeFalsy();

    component['form'].setValue({
      password: 'any_password',
      confirmPassword: 'a'.repeat(24),
    });

    expect(
      component['form'].controls['confirmPassword'].hasError('maxlength'),
    ).toBeFalsy();

    component['form'].setValue({
      password: 'any_password',
      confirmPassword: 'a'.repeat(25),
    });

    expect(component['form'].valid).toBeFalsy();
    expect(component['form'].controls['confirmPassword'].valid).toBeFalsy();
    expect(
      component['form'].controls['confirmPassword'].hasError('maxlength'),
    ).toBeTruthy();
  });

  it('should accept valid confirm password', () => {
    component['form'].setValue({
      password: 'any_password',
      confirmPassword: 'any_password',
    });

    expect(component['form'].controls['confirmPassword'].valid).toBeTruthy();
  });

  it('should validate if passwords match', () => {
    component['form'].setValue({
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
