import express, { Express } from 'express';

import { bootstrap } from './boostrap';
import { Logger, newLoggerMiddleware } from './common/logger';

const app: Express = express();
const port: number = 3000;

// create app-wide logger
const logger: Logger = new Logger();

// create middleware to enrich http logs
app.use(newLoggerMiddleware(logger));

// setup app and dependencies
bootstrap(app, logger);

// start the server
app.listen(port, () => {
  logger.logInfo(`App listening on port ${port}`);
});
