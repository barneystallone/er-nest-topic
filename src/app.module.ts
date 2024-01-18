import { NestConfigModule } from '@/configs';
import { OrmModule } from '@/databases';
import { HandlebarService, NestI18nModule, NestMailModule, NestWinstonModule } from '@/lib';
import { ReservationsModule } from '@/modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ReservationsModule,
    OrmModule,
    NestConfigModule,
    NestI18nModule,
    NestMailModule,
    NestWinstonModule,
  ],
  providers: [HandlebarService],
})
export class AppModule {}
