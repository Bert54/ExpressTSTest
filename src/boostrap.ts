import { Express } from 'express';

import { HelloWorldService } from './core/hello-world/services';
import { Logger } from './common/logger';
import { bootstrap as bootstrapHttpHandlers } from './inbound/http-handlers';

export function bootstrap(app: Express, logger: Logger): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize http handlers
  bootstrapHttpHandlers(app, logger, {
    helloService: helloService,
  });
}
