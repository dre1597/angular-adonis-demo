import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

test.group('Auth - SignUp - Username', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/signup').json({
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
  });

  test('should be at least 3 characters', async ({ client }) => {
    const response = await client.post('/signup').json({
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
  });

  test('should be at most 24 characters', async ({ client }) => {
    const response = await client.post('/signup').json({
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
  });

  test('should be valid', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(200);
  });
});

test.group('Auth - SignUp - Email', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/signup').json({
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
  });

  test('should be unique', async ({ client }) => {
    let response = await client.post('/signup').json({
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

  test('should be valid', async ({ client }) => {
    const response = await client.post('/signup').json({
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
  });
});
