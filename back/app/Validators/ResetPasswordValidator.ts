import { CustomMessages, rules, schema } from '@ioc:Adonis/Core/Validator';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ResetPasswordValidator {
  public schema = schema.create({
    token: schema.string({ trim: true }, [rules.uuid()]),
    password: schema.string({ trim: true }, [rules.minLength(6), rules.maxLength(24)]),
  });

  public messages: CustomMessages = {
    required: '{{ field }} is required',
    minLength: '{{ field }} must be at least {{ options.minLength }} characters',
    maxLength: '{{ field }} must be at most {{ options.maxLength }} characters',
    uuid: '{{ field }} must be a valid uuid',
  };

  constructor(protected ctx: HttpContextContract) {}
}
