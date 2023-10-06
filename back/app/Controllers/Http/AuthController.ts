import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SignUpValidator from '../../Validators/SignUpValidator';
import User from '../../Models/User';

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const data = await request.validate(SignUpValidator);

    try {
      return await User.create(data);
    } catch (error) {
      return response.internalServerError({ error: 'Error while creating user' });
    }
  }
}
