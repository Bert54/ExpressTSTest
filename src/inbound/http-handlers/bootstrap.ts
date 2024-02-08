import express, { Express } from 'express';
import { Logger } from '../../common/logger';

export function registerGetRoute(
  path: string,
  handler: (req: express.Request, res: express.Response) => void,
  app: Express,
  logger: Logger,
) {
  app.get(path, handler);
  logger.logInfo(`Mapped route: '(GET) ${path}'`);
}
