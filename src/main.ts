import {
  BaseExceptionFiter,
  BaseValidationPipe,
  LogResponseInterceptor,
  ParseErrorInterceptor,
} from '@/common';
import { Config } from '@/configs';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';
import { AppModule } from './app.module';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService<Config>);
  const PORT = configService.get('app.port', { infer: true });
  const prefix = configService.get('app.prefix', { infer: true });

  // Global Middleware
  app.use(helmet());
  app.use(compression());
  app.enableCors({
    maxAge: 5000,
    origin: '*', //  only dev mode
  });

  const winstonLogger: WinstonLogger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.setGlobalPrefix(prefix);
  app.useGlobalInterceptors(
    new LogResponseInterceptor(winstonLogger),
    new ParseErrorInterceptor(new Reflector()),
  );
  app.useGlobalPipes(new BaseValidationPipe());
  app.useGlobalFilters(new BaseExceptionFiter());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(PORT, () => {
    logger.log(`Application is running on http://localhost:${PORT}/${prefix}/`);
  });
}
bootstrap();
