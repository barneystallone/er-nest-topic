import { NestConfigModule } from '@/configs';
import { OrmModule } from '@/databases';
import { NestI18nModule } from '@/lib';
import { ReservationsModule } from '@/modules';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ReservationsModule, OrmModule, NestConfigModule, NestI18nModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
