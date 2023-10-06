import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class LoginValidator {
  public schema = schema.create({
    email: schema.string({ trim: true }, [rules.email()]),
    password: schema.string({ trim: true }, [rules.minLength(6), rules.maxLength(24)]),
  });
  public messages: CustomMessages = {
    required: '{{ field }} is required',
    email: '{{ field }} must be a valid email',
    minLength: '{{ field }} must be at least {{ options.minLength }} characters',
    maxLength: '{{ field }} must be at most {{ options.maxLength }} characters',
  };

  constructor(protected ctx: HttpContextContract) {}
}
