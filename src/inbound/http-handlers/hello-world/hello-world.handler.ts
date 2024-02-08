import express from 'express';

import { HelloWorldService } from '../../../core/services/hello-world';

export function getHelloHandler(helloWorldService: HelloWorldService) {
  return (_: express.Request, res: express.Response): void => {
    const hello: string = helloWorldService.getHello();
    res.send(hello);
  };
}
