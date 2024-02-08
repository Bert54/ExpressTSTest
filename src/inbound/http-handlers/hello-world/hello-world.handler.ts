import express from 'express';

import { HelloWorldService } from '../../../core/hello-world/services';
import { Hello } from '../../../core/hello-world/interfaces';

export function getHelloHandler(helloWorldService: HelloWorldService) {
  return (_: express.Request, res: express.Response): void => {
    const hello: string = helloWorldService.getHello();
    res.send(hello);
  };
}

export function getHelloJsonHandler(helloWorldService: HelloWorldService) {
  return (_: express.Request, res: express.Response): void => {
    const hello: Hello = helloWorldService.getHelloInterface();
    res.send(hello);
  };
}
