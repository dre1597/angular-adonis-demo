import { test } from '@japa/runner';

import { HttpStatus } from '../../app/Utils/http-status.enum';

test('display welcome page', async ({ client }) => {
  const response = await client.get('/');

  response.assertStatus(HttpStatus.OK);
  response.assertBodyContains({ hello: 'world' });
});
