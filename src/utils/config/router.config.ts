import { AuthModule } from 'src/resources/auth/auth.module';

export const routerConfig = [
  {
    path: 'auth',
    module: AuthModule,
    children: []
  }
];
