import { HelloWorldService } from '../../../core/services/hello-world';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import express from 'express';
import { getHelloHandler } from './hello-world.handler';

describe('HelloWorldHandler', () => {
  let helloWorldHandler: (req: express.Request, res: express.Response) => void;
  let helloWorldService: DeepMocked<HelloWorldService>;
  let req: DeepMocked<express.Request>;
  let res: DeepMocked<express.Response>;

  beforeEach(() => {
    helloWorldService = createMock<HelloWorldService>();
    req = createMock<express.Request>();
    res = createMock<express.Response>();
    helloWorldHandler = getHelloHandler(helloWorldService);
  });

  it('Should work', () => {
    const expectedString: string = 'hi :D';
    helloWorldService.getHello.mockReturnValue(expectedString);
    helloWorldHandler(req, res);

    expect(helloWorldService.getHello).toHaveBeenCalledTimes(1);
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
