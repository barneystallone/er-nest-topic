import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const logger = new Logger('App');

export const appConfValidateSchema = {
  APP_PORT: Joi.number().required(),
  NODE_ENV: Joi.string().valid('development', 'production'),
  PREFIX: Joi.string(),
};

export const app = registerAs('app', () => {
  logger.log(`Using ${process.cwd()}/.env.${process.env.NODE_ENV}`);
  return {
    port: +process.env.APP_PORT,
    env: process.env.NODE_ENV,
    prefix: process.env.PREFIX,
  };
});
