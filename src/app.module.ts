import { NestConfigModule } from '@/configs';
import { OrmModule } from '@/databases';
import { NestI18nModule, NestWinstonModule } from '@/lib';
import { ReservationsModule } from '@/modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [ReservationsModule, OrmModule, NestConfigModule, NestI18nModule, NestWinstonModule],
})
export class AppModule {}
