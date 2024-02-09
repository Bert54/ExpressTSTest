import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';

import { Logger } from '../logger';

import * as swaggerDocument from '../../../swagger.json';

export function boostrapOpenAPIDocumentation(app: Express, logger: Logger) {
  const route: string = '/api-doc';

  // Spin up the Swagger documentation
  app.use(route, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  logger.logInfo(`OpenAPI documentation served at '${route}'`);
}
