import { NestConfigModule } from '@/configs';
import { OrmModule } from '@/databases';
import { NestI18nModule, NestWinstonModule, HandlebarService, NestMailModule } from '@/lib';
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
