import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

import { ForgotPasswordComponent } from './forgot-password.component';
import { SharedModule } from '../../shared/shared.module';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  const primeNgModules = [ButtonModule, InputTextModule];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [SharedModule, ReactiveFormsModule, ...primeNgModules],
    });
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start with an empty form', () => {
    expect(component['form'].valid).toBeFalsy();

    expect(component['form'].controls['email'].value).toBe('');
  });

  it('should require email', () => {
    component['form'].setValue({
      email: '',
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
    });

    expect(component['form'].valid).toBeTruthy();
    expect(component['form'].controls['email'].valid).toBeTruthy();
  });
});
