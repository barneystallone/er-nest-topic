import { Options } from '@mikro-orm/core';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import baseConfig from './base.config';

dotenvExpand.expand(dotenv.config({ path: `.env.${process.env.NODE_ENV}` }));

const config = (): Options => ({
  ...baseConfig,
  clientUrl: process.env.DB_URI,
});

export default config();
