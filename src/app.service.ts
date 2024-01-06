import { MailerService } from '@/lib';
import { Injectable } from '@nestjs/common';
const DUMMY_DATA_LINK_API = 'https://jsonplaceholder.typicode.com/users';

@Injectable()
export class AppService {
  constructor(private readonly mailerService: MailerService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getDummyData(): Promise<any> {
    const data = await fetch(DUMMY_DATA_LINK_API, { method: 'get' }).then((res) => res.json());

    return {
      data,
      message: 'Response with no error',
      status_code: '200',
    };
  }
}
