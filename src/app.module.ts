import { NestConfigModule } from '@/configs';
import { NestI18nModule } from '@/lib';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [NestConfigModule, NestI18nModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
