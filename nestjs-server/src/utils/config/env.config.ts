import { validation } from './env-validation.config';
import { ConfigModuleOptions } from '@nestjs/config';

const configuration = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  api_prefix: process.env.APP_ROUTE_PREFIX ?? 'api',
  node_env: process.env.NODE_ENV,
  database_url: process.env.DATABASE_URL,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY
  }
});

export const envConfig = (): ConfigModuleOptions => {
  return <ConfigModuleOptions>{
    isGlobal: true,
    envFilePath: '.env',
    validationSchema: validation(),
    load: [configuration]
  };
};
