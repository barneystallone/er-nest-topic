import { ConfigType } from '@nestjs/config';
import { app, database, mail } from './registrations';

export interface Config {
  app: ConfigType<typeof app>;
  database: ConfigType<typeof database>;
  mail: ConfigType<typeof mail>;
}
