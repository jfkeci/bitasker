import * as Joi from 'joi';

export const validation = (): Joi.ObjectSchema<any> =>
  Joi.object({
    PORT: Joi.number().default(12256),
    NODE_ENV: Joi.string()
      .valid('development', 'production')
      .default('development'),
    APP_ROUTE_PREFIX: Joi.string().default('api'),
    DATABASE_URL: Joi.string().exist(),
    JWT_SECRET: Joi.string().exist(),
    JWT_EXPIRY: Joi.string()
  });
