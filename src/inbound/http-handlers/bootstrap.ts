import express, { Express } from 'express';

import { Logger } from '../../common/logger';
import { ServicesHolder } from '../interfaces';
import { getHelloHandler, getHelloJsonHandler } from './hello-world';

export function bootstrap(
  app: Express,
  logger: Logger,
  serviceHolder: ServicesHolder,
) {
  registerGetRoute(
    '/hello',
    getHelloHandler(serviceHolder.helloService),
    app,
    logger,
  );
  registerGetRoute(
    '/hello/json',
    getHelloJsonHandler(serviceHolder.helloService),
    app,
    logger,
  );
}

function registerGetRoute(
  path: string,
  handler: (req: express.Request, res: express.Response) => void,
  app: Express,
  logger: Logger,
) {
  app.get(path, handler);
  logger.logInfo(`Mapped route: '(GET) ${path}'`);
}
