import { Express } from 'express';

import { HelloWorldService } from './core/services/hello-world';
import { getHelloHandler } from './inbound/http-handlers/hello-world';

export function bootstrap(app: Express): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize http routes
  app.get('/', getHelloHandler(helloService));
}
