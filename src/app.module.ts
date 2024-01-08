import { NestConfigModule } from '@/configs';
import { OrmModule } from '@/databases';
import { NestI18nModule } from '@/lib';
import { AuthModule, ReservationsModule, UserModule } from '@/modules';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ReservationsModule,
    OrmModule,
    NestConfigModule,
    NestI18nModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
