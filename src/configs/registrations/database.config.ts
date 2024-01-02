import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const logger = new Logger('Database');

export const databaseConfValidateSchema = {
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  DB_PORT: Joi.number().positive().required(),
  DB_URI: Joi.string().required(),
};

export const database = registerAs('database', () => {
  logger.log(`Using ${process.cwd()}/.env.${process.env.NODE_ENV}`);
  return {
    uri: process.env.DB_URI,
    name: process.env.NODE_ENV,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    host: process.env.DB_URI,
  };
});
