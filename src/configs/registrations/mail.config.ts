import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const mailConfValidateSchema = {
  MAIL_USERNAME: Joi.string(),
  MAIL_PASSWORD: Joi.string(),
  MAIL_SECURE: Joi.boolean(),
  MAIL_HOST: Joi.string(),
  MAIL_PORT: Joi.number().port(),
  MAIL_RETRY_ATTEMPT: Joi.number(),
};

export const mail = registerAs('mail', () => ({
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  secure: !!process.env.MAIL_SECURE,
  host: process.env.MAIL_HOST,
  port: +process.env.MAIL_PORT,
  retry: +process.env.MAIL_RETRY_ATTEMPT,
}));
