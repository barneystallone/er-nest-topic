import { MailerService, translate } from '@/lib';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly mailService: MailerService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  // @Get('test-email')
  // testSendEmail() {
  //   this.mailService.sendMail({
  //     from: 'Halo@gmail.com',
  //     to: 'vinlinguyen1411@gmail.com',
  //     subject: 'Message title',
  //     text: translate('test.HELLO') as unknown as string,
  //   });

  //   // test html - i18n
  //   this.mailService.sendMail({
  //     from: 'Halo@gmail.com',
  //     to: 'vinlinguyen1411@gmail.com',
  //     subject: 'Email verification',
  //     html: translate('email.emailVerification', {
  //       args: { email: 'abcd@gmail.com', otp: 123 },
  //     }).toString(),
  //   });
  //   return;
  // }

  @Get('test-i18n')
  getHelloTest() {
    return translate('test.HELLO');
  }

  @Get('dummy')
  getDummyData(): Promise<any> {
    return this.appService.getDummyData();
  }
}
