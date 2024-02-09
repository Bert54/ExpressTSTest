import { Express } from 'express';

import { HelloWorldService } from './core/hello-world/services';
import { Logger } from './common/logger';
import { bootstrap as bootstrapHttpHandlers } from './inbound/http-handlers';
import { ConfigService } from './common/config';

export function bootstrap(
  app: Express,
  logger: Logger,
  config: ConfigService,
): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize http handlers
  bootstrapHttpHandlers(app, logger, {
    configService: config,
    helloService: helloService,
  });
}
