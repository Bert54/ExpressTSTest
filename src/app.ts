import express, { Express } from 'express';

import { bootstrap } from './boostrap';
import { Logger, newLoggerMiddleware } from './common/logger';
import { AppConfig, ConfigService } from './common/config';

const app: Express = express();

// instantiate configuration object
const config: ConfigService = new ConfigService();

// create app-wide logger
const logger: Logger = new Logger();

// create middleware to enrich http logs
app.use(newLoggerMiddleware(logger));

// setup app and dependencies
bootstrap(app, logger, config);

// start the server
const appConfig: AppConfig = config.getConfig<AppConfig>('server');
app.listen(appConfig.port, appConfig.host, () => {
  logger.logInfo(`App running at http://${appConfig.host}:${appConfig.port}`);
});
