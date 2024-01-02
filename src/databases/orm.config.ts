import { LoadStrategy } from '@mikro-orm/core';
import type { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import baseConfig from './base.config';
const logger = new Logger('MikroORM');

export const ormConfig = registerAs('MikroORM', (): MikroOrmModuleSyncOptions => {
  logger.log(`Using ${process.cwd()}/.env.${process.env.NODE_ENV}`);
  return {
    ...baseConfig,
    clientUrl: process.env.DB_URI,
    logger: logger.log.bind(logger),
    loadStrategy: LoadStrategy.JOINED,
    registerRequestContext: true,
    pool: { min: 2, max: 10 },
  };
});
