import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';
import { v4 as uuid } from 'uuid';
import User from '../../../app/Models/User';
import { HttpStatus } from '../../../app/Utils/http-status.enum';

test.group('Auth - Forgot Password - Email', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/auth/forgot-password').json({
      email: '',
    });

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email is required',
          rule: 'required',
        },
      ],
    });
  });

  test('should be valid', async ({ client }) => {
    const response = await client.post('/auth/forgot-password').json({
      email: 'invalid_email',
    });

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);

    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email must be a valid email',
          rule: 'email',
        },
      ],
    });
  });

  test('should add an token to the user', async ({ client, assert }) => {
    await User.create({
      publicId: uuid(),
      email: 'email@example.com',
      username: 'username',
      password: 'password',
    });

    const response = await client.post('/auth/forgot-password').json({
      email: 'email@example.com',
    });

    response.assertStatus(HttpStatus.OK);

    const user = await User.findByOrFail('email', 'email@example.com');

    assert.exists(user.forgotPasswordToken);
    assert.exists(user.forgotPasswordTokenExpiresAt);
    assert.isAbove(user.forgotPasswordTokenExpiresAt!.toJSDate(), new Date());
  });
});
