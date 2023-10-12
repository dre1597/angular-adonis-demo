import Route from '@ioc:Adonis/Core/Route';

Route.group(() => {
  Route.post('/signup', 'AuthController.signUp');
  Route.post('/login', 'AuthController.login');
  Route.post('/forgot-password', 'AuthController.forgotPassword');
  Route.post('/reset-password', 'AuthController.resetPassword');
}).prefix('/auth');
