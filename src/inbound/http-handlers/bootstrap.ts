import express, { Express, Router } from 'express';

import { Logger } from '../../common/logger';
import { ServicesHolder } from '../interfaces';
import { getHelloHandler, getHelloJsonHandler } from './hello-world';
import { bootstrapOpenAPIDocumentation } from './common/openapi';
import { getErrorHandler, getRouteNotFoundHandler } from './common/errors';

export function bootstrap(
  app: Express,
  logger: Logger,
  servicesHolder: ServicesHolder,
) {
  bootstrapV1App(app, logger, servicesHolder);

  // setup openapi documentation
  bootstrapOpenAPIDocumentation(app, logger);

  // setup global error handler (must be last)
  app.all('*', getRouteNotFoundHandler());
  app.use(getErrorHandler());
}

function bootstrapV1App(
  app: Express,
  logger: Logger,
  servicesHolder: ServicesHolder,
) {
  const basePath: string = '/api/v1';
  const v1Router: Router = express.Router();

  registerGetRoute(
    '/hello',
    getHelloHandler(servicesHolder.helloService),
    v1Router,
    logger,
    basePath,
  );
  registerGetRoute(
    '/hello/json',
    getHelloJsonHandler(servicesHolder.helloService),
    v1Router,
    logger,
    basePath,
  );

  app.use(basePath, v1Router);
}

function registerGetRoute(
  path: string,
  handler: (req: express.Request, res: express.Response) => void,
  router: Router,
  logger: Logger,
  basePath?: string,
) {
  router.get(path, handler);
  logger.logInfo(`Mapped route '(GET) ${!!basePath ? basePath : ''}${path}'`);
}
