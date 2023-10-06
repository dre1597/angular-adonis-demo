import { test } from '@japa/runner';
import TestUtils from '@ioc:Adonis/Core/TestUtils';

test.group('Auth signup', (group) => {
  group.each.setup(async () => {
    await TestUtils.db().truncate();
  });

  test('should validate username', async ({ client }) => {
    let response = await client.post('/signup').json({
      username: '',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          message: 'username is required',
          rule: 'required',
        },
      ],
    });

    response = await client.post('/signup').json({
      username: 'a'.repeat(2),
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          message: 'username must be at least 3 characters',
          rule: 'minLength',
        },
      ],
    });

    response = await client.post('/signup').json({
      username: 'a'.repeat(25),
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'username',
          message: 'username must be at most 24 characters',
          rule: 'maxLength',
        },
      ],
    });

    response = await client.post('/signup').json({
      username: 'a'.repeat(24),
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(200);
  });

  test('should validate email', async ({ client }) => {
    let response = await client.post('/signup').json({
      username: 'username',
      email: '',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email is required',
          rule: 'required',
        },
      ],
    });

    response = await client.post('/signup').json({
      username: 'username',
      email: 'invalid_email',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email must be a valid email',
          rule: 'email',
        },
      ],
    });

    response = await client.post('/signup').json({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(200);

    response = await client.post('/signup').json({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(422);
    response.assertBodyContains({
      errors: [
        {
          field: 'email',
          message: 'email must be unique',
          rule: 'unique',
        },
      ],
    });
  });
});
