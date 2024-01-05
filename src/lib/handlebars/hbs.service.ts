import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { PathLike } from 'fs';
import { readFile } from 'fs/promises';
import { handlebars } from 'hbs';
import { translate } from '../i18n';

/**
 * @see https://github.com/ToonvanStrijp/nestjs-i18n/issues/1
 */
@Injectable()
export class HandlebarService implements OnApplicationBootstrap {
  private hbs: typeof Handlebars;
  constructor() {
    this.hbs = handlebars;
  }

  async onApplicationBootstrap() {
    this.hbs.registerHelper('t', translate);
  }

  /**
   * @example
   * const html = this.hbsService.renderHtml(path, {email: 'abcd@gmail.com'})
   *
   * this.mailService.sendMail({
   *    from: 'Halo@gmail.com',
   *    to: 'test@gmail.com',
   *    subject: 'Email verification',
   *    html: html,
   * });
   */
  async renderHtml(templatePath: PathLike, context: object) {
    const templateFile = await readFile(templatePath, 'utf-8');
    const template = this.hbs.compile(templateFile);
    const html = template(context);

    return html;
  }
}
