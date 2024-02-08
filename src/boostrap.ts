import { Express } from 'express';

import { HelloWorldService } from './core/hello-world/services';
import {
  getHelloHandler,
  getHelloJsonHandler,
} from './inbound/http-handlers/hello-world';
import { Logger } from './common/logger';
import { registerGetRoute } from './inbound/http-handlers';

export function bootstrap(app: Express, logger: Logger): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize http routes
  registerGetRoute('/hello', getHelloHandler(helloService), app, logger);
  registerGetRoute(
    '/hello/json',
    getHelloJsonHandler(helloService),
    app,
    logger,
  );
}
