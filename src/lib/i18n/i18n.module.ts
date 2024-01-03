import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';

/**
 * @see https://nestjs-i18n.com/quick-start
 */
@Module({
  imports: [
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return {
          fallbackLanguage: 'en',
          fallbacks: {
            en: 'en',
            vi: 'vi',
          },
          loaderOptions: {
            path: `${process.cwd()}/src/resources/i18n/`,
            watch: true,
            includeSubfolders: true,
          },
          logging: true,
          includeSubfolders: true,
          typesOutputPath: configService.get('NODE_ENV').startsWith('prod')
            ? undefined
            : `${process.cwd()}/src/generated/i18n-generated.ts`,
        };
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
      inject: [ConfigService],
    }),
  ],

  //   exports: [I18nModule],
})
export class NestI18nModule {}
