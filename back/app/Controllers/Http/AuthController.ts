import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SignUpValidator from '../../Validators/SignUpValidator';
import User from '../../Models/User';
import { v4 as uuid } from 'uuid';
import Logger from '@ioc:Adonis/Core/Logger';

export default class AuthController {
  public async signUp({ request, response }: HttpContextContract) {
    const data = await request.validate(SignUpValidator);

    try {
      const createdUser = await User.create({ ...data, publicId: uuid() });
      return {
        id: createdUser.publicId,
        username: createdUser.username,
        email: createdUser.email,
      };
    } catch (error) {
      Logger.error(error);
      return response.internalServerError({ error: 'Error while creating user' });
    }
  }
}
