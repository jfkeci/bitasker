import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  /** Create an instance of Nest application */
  const app = await NestFactory.create(AppModule);

  /** Sets custom logger service. Flushes buffered logs if auto flush is on. */
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  const config: ConfigService = app.get(ConfigService);

  const port = config.get<number>('port');
  const prefix = config.get<string>('api_prefix');

  /**
   * Registers a prefix for every HTTP route path.
   * Ignores the base path "GET <baseUrl>/" used for healthcheck
   */
  app.setGlobalPrefix(prefix, {
    exclude: [{ path: '/', method: RequestMethod.GET }]
  });

  /** Swagger setup */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('String Encoder API')
    .setDescription('String Encoder API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  /** Registers pipes as global pipes (will be used within every HTTP route handler) */
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await app.listen(port);
}
bootstrap();
