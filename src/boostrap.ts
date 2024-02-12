import { Express } from 'express';

import { HelloWorldService } from './core/hello-world/services';
import { Logger } from './common/logger';
import { bootstrap as bootstrapHttpHandlers } from './inbound/http-handlers';
import { ConfigService } from './common/config';
import { SQLDatabase } from './outbound/database/sql';

export function bootstrap(
  app: Express,
  logger: Logger,
  config: ConfigService,
): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize db
  new SQLDatabase(config);

  // initialize http handlers
  bootstrapHttpHandlers(app, logger, {
    configService: config,
    helloService: helloService,
  });
}
