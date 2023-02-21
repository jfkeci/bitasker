import * as winston from 'winston';
import { utilities } from 'nest-winston';

import 'winston-daily-rotate-file';

const colors = {
  error: 'red',
  warn: 'yellow',
  debug: 'green',
  verbose: 'white',
  http: 'magenta'
};

export const loggerConfig = (
  logLevel?: string,
  env?: string,
  rotationConfig?: {
    frequency?: string;
    maxFiles?: string;
    maxSize?: string;
  }
) => {
  let level: string = logLevel;

  if (!level) level = env === 'development' ? 'verbose' : 'http';

  const frequency = rotationConfig.frequency || '1d';
  const maxFiles = rotationConfig.maxFiles || '7d';
  const maxSize = rotationConfig.maxSize || '20m';

  return {
    transports: [
      new winston.transports.Console({
        level: level,
        format: winston.format.combine(
          winston.format.timestamp({ format: 'dd-mm-YYYY hh:MM:ss' }),
          winston.format.errors({ stack: true }),
          winston.format.colorize({ colors }),
          utilities.format.nestLike('BlueApp', {
            prettyPrint: true
          })
        )
      }),
      new winston.transports.DailyRotateFile({
        level: 'error',
        dirname: process.cwd() + '/logs/error',
        extension: '.error.log',
        filename: 'application-%DATE%',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        frequency,
        maxFiles,
        maxSize
      }),
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: process.cwd() + '/logs/warn',
        extension: '.warn.log',
        filename: 'application-%DATE%',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        frequency,
        maxFiles,
        maxSize
      }),
      new winston.transports.DailyRotateFile({
        level: 'debug',
        dirname: process.cwd() + '/logs/debug',
        extension: '.debug.log',
        filename: 'application-%DATE%',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        frequency,
        maxFiles,
        maxSize
      })
    ]
  };
};
