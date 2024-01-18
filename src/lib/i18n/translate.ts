import type { I18nPath, I18nTranslations } from '@/generated/i18n-generated';
import { I18nContext, TranslateOptions } from 'nestjs-i18n';

/**
 *
 * @see https://nestjs-i18n.com/quick-start
 * @see https://nestjs-i18n.com/guides/type-safety
 * @example
 * translate('test.HELLO', {lang: 'vi'})
 */
export function translate(key: I18nPath, options: TranslateOptions = {}) {
  const i18nContext = I18nContext.current<I18nTranslations>();

  if (i18nContext) return i18nContext.t(key, options);

  return '';
}
