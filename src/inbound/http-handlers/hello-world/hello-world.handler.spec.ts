import { HelloWorldService } from '../../../core/hello-world/services';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import express from 'express';
import { getHelloHandler, getHelloJsonHandler } from './hello-world.handler';
import { Hello } from '../../../core/hello-world/interfaces';

describe('HelloWorldHttpHandlers', () => {
  let helloWorldHandler: (req: express.Request, res: express.Response) => void;
  let helloWorldService: DeepMocked<HelloWorldService>;
  let req: DeepMocked<express.Request>;
  let res: DeepMocked<express.Response>;

  beforeEach(() => {
    helloWorldService = createMock<HelloWorldService>();
    req = createMock<express.Request>();
    res = createMock<express.Response>();
  });

  // --------------------------------
  // Test suite for getHelloHandler
  // --------------------------------
  describe('getHelloHandler', () => {
    beforeEach(() => {
      helloWorldHandler = getHelloHandler(helloWorldService);
    });

    it('Should work', () => {
      const usedString: string = 'hi :D';
      helloWorldService.getHello.mockReturnValue(usedString);
      helloWorldHandler(req, res);

      expect(helloWorldService.getHello).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
    });
  });

  // --------------------------------
  // Test suite for getHelloJsonHandler
  // --------------------------------
  describe('getHelloJsonHandler', () => {
    beforeEach(() => {
      helloWorldHandler = getHelloJsonHandler(helloWorldService);
    });

    it('Should work', () => {
      const usedInterface: Hello = {
        hello: 'hi :D',
      };
      helloWorldService.getHelloInterface.mockReturnValue(usedInterface);
      helloWorldHandler(req, res);

      expect(helloWorldService.getHelloInterface).toHaveBeenCalledTimes(1);
      expect(res.send).toHaveBeenCalledTimes(1);
    });
  });
});
