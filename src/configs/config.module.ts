import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import {
  app,
  appConfValidateSchema,
  database,
  databaseConfValidateSchema,
  mail,
  mailConfValidateSchema,
} from './registrations';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.cwd()}/.env.${process.env.NODE_ENV}`],
      expandVariables: true,
      cache: true,
      load: [app, database, mail],
      validationSchema: Joi.object({
        ...appConfValidateSchema,
        ...databaseConfValidateSchema,
        ...mailConfValidateSchema,
        // @more
      }),
    }),
  ],
})
export class NestConfigModule {}
