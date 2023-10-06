import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/signup', 'AuthController.signUp');
});
