import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import SignUpValidator from '../../Validators/SignUpValidator';
import User from '../../Models/User';
import { v4 as uuid } from 'uuid';
import Logger from '@ioc:Adonis/Core/Logger';
import Mail from '@ioc:Adonis/Addons/Mail';
import LoginValidator from '../../Validators/LoginValidator';
import ForgotPasswordValidator from '../../Validators/ForgotPasswordValidator';
import { DateTime } from 'luxon';
import Env from '@ioc:Adonis/Core/Env';
import ResetPasswordValidator from '../../Validators/ResetPasswordValidator';

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

  public async login({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(LoginValidator);

    const user = await User.findByOrFail('email', data.email);

    try {
      const payload = {
        id: user.publicId,
        username: user.username,
        email: user.email,
      };

      const token = await auth.use('jwt').generate(user, {
        payload,
      });

      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        user: payload,
      };
    } catch (error) {
      Logger.error(error);
      return response.internalServerError({ error: 'Error while authenticating user' });
    }
  }

  public async forgotPassword({ request, response }: HttpContextContract) {
    const data = await request.validate(ForgotPasswordValidator);

    const user = await User.findByOrFail('email', data.email);

    try {
      user.forgotPasswordToken = uuid();
      user.forgotPasswordTokenExpiresAt = DateTime.now().plus({ hours: 3 });

      await user.save();

      if (Env.get('NODE_ENV') === 'test') {
        return;
      }

      await Mail.sendLater((message) => {
        message
          .from('example@email.com')
          .to(user.email)
          .subject('Forgot Password')
          .htmlView('emails/forgot_password', {
            username: user.username,
            url: `${Env.get('FRONTEND_URL', 'http://localhost:3000')}?token=${
              user.forgotPasswordToken
            }`,
          });

        Logger.info(`Forgot password email was sent to ${user.email}`);
      });
    } catch (error) {
      Logger.error(error);
      return response.internalServerError({ error: 'Error while sending forgot password email' });
    }
  }

  public async resetPassword({ request, response }: HttpContextContract) {
    const data = await request.validate(ResetPasswordValidator);

    const user = await User.findByOrFail('forgotPasswordToken', data.token);

    if (user?.forgotPasswordTokenExpiresAt && user.forgotPasswordTokenExpiresAt < DateTime.now()) {
      return response.forbidden({ error: 'Token expired' });
    }

    try {
      user.password = data.password;
      user.forgotPasswordToken = null;
      user.forgotPasswordTokenExpiresAt = null;

      await user.save();
    } catch (error) {
      Logger.error(error);
      return response.internalServerError({ error: 'Error while resetting password' });
    }
  }
}
