import { Express } from 'express';

import { HelloWorldService } from './core/services/hello-world';
import { getHello } from './inbound/http-routes/hello-world';

export function bootstrap(app: Express): void {
  // initialize services
  const helloService: HelloWorldService = new HelloWorldService();

  // initialize http routes
  app.get('/', getHello(helloService));
}
