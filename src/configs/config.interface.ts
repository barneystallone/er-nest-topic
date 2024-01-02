import { ConfigType } from '@nestjs/config';
import { app, database } from './registrations';

export interface Config {
  app: ConfigType<typeof app>;
  database: ConfigType<typeof database>;
}
