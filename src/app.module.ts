import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { envConfig } from './utils/config/env.config';
import { EncoderModule } from './encoder/encoder.module';
import { AuthModule } from './resources/auth/auth.module';
import { loggerConfig } from './utils/config/logger.config';
import { routerConfig } from './utils/config/router.config';
import { PrismaModule } from './utils/prisma/prisma.module';
import { UsersModule } from './resources/users/users.module';
import { AuthGuard } from './resources/auth/guards/auth.guard';
import { APP_FILTER, APP_GUARD, RouterModule } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/filters/http-exception.filter';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    WinstonModule.forRoot(
      loggerConfig(process.env.LOG_LEVEL, process.env.NODE_ENV, {
        frequency: process.env.LOG_FREQUENCY,
        maxFiles: process.env.LOG_MAX_FILES,
        maxSize: process.env.LOG_MAX_FILE_SIZE
      })
    ),
    RouterModule.register(routerConfig),
    ConfigModule.forRoot(envConfig()),
    EncoderModule,
    PrismaModule,
    UsersModule,
    AuthModule
  ],
  providers: [
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_GUARD, useClass: AuthGuard }
  ]
})
export class AppModule {}
