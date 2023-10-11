import { test } from '@japa/runner';
import Database from '@ioc:Adonis/Lucid/Database';

import User from '../../../app/Models/User';
import { HttpStatus } from '../../../app/Utils/http-status.enum';

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

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);
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

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);
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

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);
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

    response.assertStatus(HttpStatus.OK);
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

  test('should be unique', async ({ client }) => {
    let response = await client.post('/signup').json({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(HttpStatus.OK);

    response = await client.post('/signup').json({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(HttpStatus.UNPROCESSABLE_ENTITY);

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

test.group('Auth - SignUp - Password', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should be required', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'username',
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
    const response = await client.post('/signup').json({
      username: 'username',
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
    const response = await client.post('/signup').json({
      username: 'username',
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

  test('should be valid', async ({ client }) => {
    const response = await client.post('/signup').json({
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    });

    response.assertStatus(HttpStatus.OK);
  });

  test('the password should be hashed', async ({ client, assert }) => {
    const email = 'email@example.com';
    const password = 'password';

    const response = await client.post('/signup').json({
      username: 'username',
      email,
      password,
    });

    response.assertStatus(HttpStatus.OK);

    const createdUser = await Database.rawQuery('SELECT password FROM "users" WHERE "email" = ?', [
      email,
    ]);

    assert.notEqual(createdUser[0].password, password);
    assert.include(createdUser[0].password, '$scrypt$');
  });
});

test.group('Auth - SignUp - Success', (group) => {
  group.each.teardown(async () => {
    await Database.rawQuery('DELETE FROM "users"');
  });

  test('should return the user with the tokens', async ({ client, assert }) => {
    const user = {
      username: 'username',
      email: 'email@example.com',
      password: 'password',
    };

    await client.post('/signup').json(user);

    const createdUser = await User.findByOrFail('email', user.email);

    assert.exists(createdUser.id);
    assert.exists(createdUser.publicId);
    assert.equal(createdUser.email, user.email);
    assert.equal(createdUser.username, user.username);
    assert.notEqual(createdUser.password, user.password);
    assert.exists(createdUser.createdAt);
    assert.exists(createdUser.updatedAt);
  });
});
