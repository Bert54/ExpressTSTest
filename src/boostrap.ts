import { Express } from 'express';

import { HelloWorldService } from './core/hello-world/services';
import {
  getHelloHandler,
  getHelloJsonHandler,
} from './inbound/http-handlers/hello-world';

export function bootstrap(app: Express): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize http routes
  app.get('/hello', getHelloHandler(helloService));
  app.get('/hello/json', getHelloJsonHandler(helloService));
}
