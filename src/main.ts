import { Config } from '@/configs';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
// moduleAlias.addAliases({
//   '@': resolve(__dirname, 'src'),
// });
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

  app.setGlobalPrefix(prefix);
  app.useGlobalPipes(new ValidationPipe());

  // Starts listening for shutdown hooks
  app.enableShutdownHooks();

  await app.listen(PORT, () => {
    logger.log(`Application is running on http://localhost:${PORT}/${prefix}/`);
  });
}
bootstrap();
