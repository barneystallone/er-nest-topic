import { translate } from '@/lib';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Get('test-i18n')
  getHelloTest() {
    return translate('test.HELLO');
  }

  @Get('dummy')
  getDummyData(): Promise<any> {
    return this.appService.getDummyData();
  }
}
