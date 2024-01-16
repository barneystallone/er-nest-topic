import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonLogger } from 'nest-winston';
import { v4 as uuid } from 'uuid';
import { LOG_TYPES, RequestLog, RequestWithId } from '../@types';

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: WinstonLogger) {}

  use(req: RequestWithId, res: Response, next: NextFunction) {
    req.id = uuid();
    const { headers, url, method, body } = req;
    const requestLog: RequestLog = {
      request: {
        id: req.id,
        headers,
        path: url,
        method,
        body,
      },
    };
    this.logger.log({ message: requestLog, type: LOG_TYPES.REQUEST }, LogRequestMiddleware.name);

    next();
  }
}
