import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';
import { v4 as uuid } from 'uuid';
import User from '../../../app/Models/User';
import { DateTime } from 'luxon';

test.group('Auth - Reset Password - Token', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: '',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'token',
          message: 'token is required',
          rule: 'required',
        },
      ],
    });
  });

  test('should be uuid', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: 'invalid_token',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'token',
          message: 'token must be a valid uuid',
          rule: 'uuid',
        },
      ],
    });
  });

  test('should be valid', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: uuid(),
      password: 'password',
    });

    response.assertStatus(404);
  });
});

test.group('Auth - Reset Password - Password', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: uuid(),
      password: '',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'password',
          message: 'password is required',
          rule: 'required',
        },
      ],
    });
  });

  test('should be at least 6 characters', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: uuid(),
      password: 'a'.repeat(5),
    });

    response.assertStatus(422);

    response.assertBodyContains({
      errors: [
        {
          field: 'password',
          message: 'password must be at least 6 characters',
          rule: 'minLength',
        },
      ],
    });
  });

  test('should be at most 24 characters', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: uuid(),
      password: 'password'.repeat(25),
    });

    response.assertStatus(422);

    response.assertBodyContains({
      errors: [
        {
          field: 'password',
          message: 'password must be at most 24 characters',
          rule: 'maxLength',
        },
      ],
    });
  });

  test('should be valid', async ({ client }) => {
    const response = await client.post('/reset-password').json({
      token: uuid(),
      password: 'password',
    });

    response.assertStatus(404);
  });
});

test.group('Auth - Reset Password - Failure', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should check token expiration', async ({ client }) => {
    const token = uuid();

    await User.create({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
      publicId: uuid(),
      forgotPasswordToken: token,
      forgotPasswordTokenExpiresAt: DateTime.now().minus({ hours: 3 }),
    });

    const response = await client.post('/reset-password').json({
      token,
      password: 'password',
    });

    response.assertStatus(403);
    response.assertBodyContains({
      error: 'Token expired',
    });
  });
});

test.group('Auth - Reset Password - Success', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should remove the token and expiration date', async ({ client, assert }) => {
    const token = uuid();

    const user = await User.create({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
      publicId: uuid(),
      forgotPasswordToken: token,
      forgotPasswordTokenExpiresAt: DateTime.now().plus({ hours: 3 }),
    });

    const response = await client.post('/reset-password').json({
      token,
      password: 'password',
    });

    response.assertStatus(200);

    const updatedUser = await User.findByOrFail('email', 'email@example.com');

    assert.isNull(updatedUser.forgotPasswordToken);
    assert.isNull(updatedUser.forgotPasswordTokenExpiresAt);
    assert.isAbove(user.updatedAt.toJSDate(), updatedUser.updatedAt.toJSDate());
  });
});
