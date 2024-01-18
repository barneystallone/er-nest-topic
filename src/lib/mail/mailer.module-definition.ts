import { ConfigurableModuleBuilder } from '@nestjs/common';
import { MailerModuleOptions } from './mailer-options.interface';

/**
 * Auto-generated static methods (register, registerAsync, forRootAsync, etc.)
 * @see https://docs.nestjs.com/fundamentals/dynamic-modules#extra-options
 */
export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN: EMAIL_CONFIG_OPTIONS } =
  new ConfigurableModuleBuilder<MailerModuleOptions>({ moduleName: 'Mailer' })
    .setExtras(
      {
        isGlobal: true,
      },
      (definition, extras) => ({
        ...definition,
        global: extras.isGlobal,
      }),
    )
    .setClassMethodName('forRoot')
    .build();
