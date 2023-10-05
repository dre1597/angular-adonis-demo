import { EMAIL_REGEX } from './regex';

describe('Regex', () => {
  it('should accept valid email', () => {
    expect(EMAIL_REGEX.test('email@valid.com')).toBeTruthy();
    expect(EMAIL_REGEX.test('email@valid.com.br')).toBeTruthy();
    expect(EMAIL_REGEX.test('email.example@valid.com.br')).toBeTruthy();
    expect(EMAIL_REGEX.test('email-example@valid.com')).toBeTruthy();
    expect(EMAIL_REGEX.test('email_example@valid.com')).toBeTruthy();
    expect(EMAIL_REGEX.test('email@123.123.123.123')).toBeTruthy();
  });

  it('should require valid email', () => {
    expect(EMAIL_REGEX.test('invalid_email')).toBeFalsy();
    expect(EMAIL_REGEX.test('email@.com.')).toBeFalsy();
    expect(EMAIL_REGEX.test('email@.com')).toBeFalsy();
    expect(EMAIL_REGEX.test('name@domain.')).toBeFalsy();
    expect(EMAIL_REGEX.test('name@domain.c')).toBeFalsy();
    expect(EMAIL_REGEX.test('name@-domain.com')).toBeFalsy();
    expect(EMAIL_REGEX.test('name@domain-.com')).toBeFalsy();
    expect(EMAIL_REGEX.test('name @ domain.com')).toBeFalsy();
  });
});
