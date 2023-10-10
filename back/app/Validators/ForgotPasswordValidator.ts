import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ForgotPasswordValidator {
  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
  });
  public messages: CustomMessages = {
    required: '{{ field }} is required',
    email: '{{ field }} must be a valid email',
  };

  constructor(protected ctx: HttpContextContract) {}
}
