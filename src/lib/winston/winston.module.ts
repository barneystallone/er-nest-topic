import { LogRequestMiddleware } from '@/common';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { NestTransports } from './transport.config';

@Module({
  imports: [
    WinstonModule.forRootAsync({
      useFactory: () => ({
        transports: [...NestTransports],
      }),
    }),
  ],
})
export class NestWinstonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogRequestMiddleware).forRoutes('*');
  }
}
