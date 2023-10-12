import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';
import { v4 as uuid } from 'uuid';

import { HttpStatus } from '../../../app/Utils/http-status.enum';
import User from '../../../app/Models/User';

test.group('Auth - Login - Email', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: '',
      password: 'password',
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
    const response = await client.post('/auth/login').json({
      email: 'invalid_email',
      password: 'password',
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
});

test.group('Auth - Login - Password', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/auth/login').json({
      email: 'email@example.com',
      password: '',
    });

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);
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
    const response = await client.post('/auth/login').json({
      email: 'email@example.com',
      password: 'a'.repeat(5),
    });

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);

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
    const response = await client.post('/auth/login').json({
      email: 'email@example.com',
      password: 'password'.repeat(25),
    });

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);

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
});

test.group('Auth - Login - Success', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should return the user with the tokens', async ({ client, assert }) => {
    await User.create({
      publicId: uuid(),
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    const response = await client.post('/auth/login').json({
      email: 'email@example.com',
      password: 'password',
    });

    const responseBody = response.body();

    assert.exists(responseBody.accessToken);
    assert.exists(responseBody.refreshToken);
    assert.exists(responseBody.user.id);
    assert.equal(responseBody.user.username, 'username');
    assert.equal(responseBody.user.email, 'email@example.com');
  });
});
