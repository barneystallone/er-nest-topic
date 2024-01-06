import { Prettify } from '@/common';
import { Inject, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { SendMailOptions, createTransport, type Transporter } from 'nodemailer';
import { MailerModuleOptions } from './mailer-options.interface';
import { EMAIL_CONFIG_OPTIONS } from './mailer.module-definition';

@Injectable()
export class MailerService {
  private readonly transporter: Transporter;
  private readonly logger = new Logger(MailerService.name);

  constructor(
    @Inject(EMAIL_CONFIG_OPTIONS) private readonly options: Prettify<MailerModuleOptions>,
  ) {
    this.transporter = createTransport({
      pool: true,
      maxConnections: 5,
      ...options,
    });
  }

  async sendMail(mailOptions: SendMailOptions): Promise<void> {
    for (let i = 0; i < this.options.retry; i++) {
      try {
        // if (i < 4) throw new Error();
        await this.transporter.sendMail(mailOptions);
        this.logger.log('Email sent successfully');
        return;
      } catch (error) {
        this.logger.error(error);
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    // @todo notify user
    throw new ServiceUnavailableException('Unable to send email');
  }
}
