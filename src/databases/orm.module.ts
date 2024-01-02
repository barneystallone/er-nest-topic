import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ormConfig } from './orm.config';

@Module({
  imports: [MikroOrmModule.forRootAsync(ormConfig.asProvider())],
  exports: [MikroOrmModule],
})
export class OrmModule {}
