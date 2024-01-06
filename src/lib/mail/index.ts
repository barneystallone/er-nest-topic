import { Config } from '@/configs';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerModuleOptions } from './mailer-options.interface';
import { MailerModule } from './mailer.module';

export * from './mailer-options.interface';
export * from './mailer.module';
export * from './mailer.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      isGlobal: true,
      useFactory: (configService: ConfigService<Config>): MailerModuleOptions => {
        return {
          host: configService.get('mail.host', { infer: true }),
          port: configService.get('mail.port', { infer: true }),
          auth: configService.get('mail.auth', { infer: true }),
          secure: configService.get('mail.secure', { infer: true }),
          retry: configService.get('mail.retry', { infer: true }),
        };
      },
      inject: [ConfigService],
    }),
  ],
  exports: [MailerModule],
})
export class NestMailModule {}
