import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from './utils/validateEnv';
import UserController from './resources/user/user.controller';
import AuthController from './resources/auth/auth.controller';

validateEnv();

const app = new App(
    [
        new UserController,
        new AuthController
    ],
    Number(process.env.PORT)
);

app.listen();
